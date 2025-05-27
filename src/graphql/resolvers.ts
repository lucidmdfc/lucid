import { FileUpload } from 'graphql-upload-minimal';

import { createClient } from '@supabase/supabase-js';

export const createSupabaseClientWithAuth = (token: string) => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
};

interface UploadedFileResponse {
  url: string;
  path: string;
  type: string;
}

interface UploadFileArgs {
  file: Promise<FileUpload>;
  documentCategory: 'expense_claims' | 'agreements' | 'service_provider_file';
  expense_claim_category?: string;
  expense_claim_id?: string;
  expense_status?: boolean;
  service_provider_id?: string;
}
async function streamToBuffer(
  stream: NodeJS.ReadableStream,
  maxSizeInBytes = 5 * 1024 * 1024 // 5MB default value
): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  let totalLength = 0;

  for await (const chunk of stream) {
    const bufferChunk = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
    // console.log(chunk);
    totalLength += bufferChunk.length;

    if (totalLength > maxSizeInBytes) {
      throw new Error('File exceeds maximum allowed size');
    }

    chunks.push(new Uint8Array(bufferChunk));
  }

  return Buffer.concat(chunks);
}

const resolvers = {
  Upload: require('graphql-upload-minimal').GraphQLUpload,

  Mutation: {
    uploadFile: async (
      _: unknown,
      {
        file,
        documentCategory,
        expense_claim_category,
        expense_status,
        expense_claim_id,
        service_provider_id,
      }: UploadFileArgs,
      context: { token: string }
    ): Promise<UploadedFileResponse> => {
      const supabase = createSupabaseClientWithAuth(context.token);
      const { createReadStream, filename, mimetype } = await file.then((f) => f);

      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(mimetype)) {
        throw new Error('Unsupported file type');
      }
      const maxSizeByType: Record<string, number> = {
        'application/pdf': 15 * 1024 * 1024, // 15MB
        // 'image/jpeg': 2 * 1024 * 1024, // 2MB
      };
      const maxSizeInBytes = maxSizeByType[mimetype] ?? 2 * 1024 * 1024; // Default to 2MB if unknown type

      const fileBuffer = await streamToBuffer(createReadStream(), maxSizeInBytes);

      const filePath = `uploads/${Date.now()}-${filename}`;

      const { data, error } = await supabase.storage.from('storage').upload(filePath, fileBuffer, {
        contentType: mimetype,
        cacheControl: '3600',
        upsert: false,
      });
      if (error || !data) {
        console.error('Storage upload error:', error);

        throw new Error(error?.message || 'Upload failed');
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('storage').getPublicUrl(data.path);

      const metadataMap = {
        expense_claims: () => ({
          expense_claim: {
            expense_claim_id: expense_claim_id,
            expense_claim_category,
            expense_status,
          },
        }),
        service_provider_file: () => ({
          service_provider: {
            service_provider_id,
          },
        }),
        agreements: () => ({
          project_id: 98765,
        }),
      };

      const metadata = metadataMap[documentCategory]?.() ?? {};

      const { error: insertError } = await supabase.from('files').insert([
        {
          original_filename: filename,
          mime_type: mimetype,
          size_bytes: fileBuffer.length,
          storage_key: data.path,
          public_url: publicUrl,
          bucket_name: 'storage',
          document_category: documentCategory,
          metadata,
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      return {
        url: publicUrl,
        path: data.path,
        type: mimetype,
      };
    },
  },
};

export default resolvers;
