import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { File, FileDropzone } from 'src/components/file-dropzone';

interface FileUploaderProps {
  onClose?: () => void;
  open?: boolean;
  onUpload?: (files: File[]) => void;
}

const FileUploader: FC<FileUploaderProps> = (props) => {
  const { onClose, open = false, onUpload } = props;
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setFiles([]);
  }, [open]);

  const handleDrop = useCallback((newFiles: File[]): void => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      console.log('Files Uploaded:', updatedFiles);
      return updatedFiles;
    });
  }, []);

  const handleRemove = useCallback((file: File): void => {
    setFiles((prevFiles) => {
      return prevFiles.filter((_file) => _file.path !== file.path);
    });
  }, []);

  const handleRemoveAll = useCallback((): void => {
    setFiles([]);
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Télécharger des fichiers</Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <FileDropzone
          //   accept={{ '*/*': [] }}
          caption="La taille maximale du fichier est de 3 Mo"
          files={files}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          onUpload={() => onUpload?.(files)}
        />
      </DialogContent>
    </Dialog>
  );
};
export default FileUploader;

FileUploader.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
