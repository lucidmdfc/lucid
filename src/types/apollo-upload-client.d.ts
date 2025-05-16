// types/apollo-upload-client.d.ts
declare module 'apollo-upload-client' {
  import { ApolloLink } from '@apollo/client';
  import { ReactNode } from 'react';

  interface UploadLinkOptions {
    uri?: string;
    credentials?: string;
    headers?: Record<string, string>;
    includeExtensions?: boolean;
    fetchOptions?: Record<string, any>;
    fetch?: WindowOrWorkerGlobalScope['fetch'];
  }

  export function createUploadLink(options?: UploadLinkOptions): ApolloLink;
}
