import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../components/delete-confirmation-modal';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { CardActions } from '@mui/material';
import { useDialog } from 'src/hooks/use-dialog';

interface ProjectDeleteManageProps {
  projectId: string;
}

const DonorDeleteManage: FC<ProjectDeleteManageProps> = ({ projectId, ...props }) => {
  const router = useRouter();
  const dialog = useDialog();

  // Replace this with your actual delete function
  const handleDelete = async (projectId: string | undefined) => {
    try {
      // put delete logic here

      // Notify user
      console.log('deleted project: ' + projectId);
      toast.success('Le project a été supprimé avec succès!');
      router.replace(paths.projets.index);
    } catch (error) {
      console.error('Error deleting project: ', error);
      toast.error('Échec de la suppression du project. Veuillez réessayer.');
    }
  };

  return (
    <CardActions
      sx={{ p: 4 }}
      {...props}
    >
      <Button
        color="error"
        variant="outlined"
        onClick={() => dialog.handleOpen()}
      >
        Supprimer le projet
      </Button>
      <DeleteConfirmationModal
        isOpen={dialog.open}
        onConfirm={handleDelete}
        onCancel={dialog.handleClose}
        message="Êtes vous sûr de vouloir supprimer le projet? Cette action sera irréversible."
        id={projectId}
      />
    </CardActions>
  );
};
export default DonorDeleteManage;
