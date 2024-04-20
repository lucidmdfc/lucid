import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from './delete-confirmation-modal';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { CardActions } from '@mui/material';

interface ProjectDeleteManageProps {
  projectId: string;
}

const ProjectDeleteManage: FC<ProjectDeleteManageProps> = ({ projectId, ...props }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };
  // Replace this with your actual delete function
  const handleDelete = async (projectId: string | undefined) => {
    try {
      if (!projectId) {
        throw new Error('Project ID is undefined');
      }

      // Get projects from local storage
      const projectsJson = localStorage.getItem('projects');
      if (!projectsJson) {
        throw new Error('No projects found in local storage');
      }
      const projects: { id: string; name: string }[] = JSON.parse(projectsJson);

      // Find the project index
      const projectIndex = projects.findIndex((project) => project.id === projectId);
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }

      // Remove the project
      projects.splice(projectIndex, 1);

      // Update projects in local storage
      localStorage.setItem('projects', JSON.stringify(projects));

      // Notify user
      console.log('deleted project: ' + projectId);
      toast.success('Le project a été supprimé avec succès!');
      router.replace(paths.dashboard.projets.index);
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
        onClick={() => handleDeleteClick()} // Replace handleDelete with your actual delete function
      >
        Supprimer le projet
      </Button>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
        message="Êtes vous sûr de vouloir supprimer le projet? Cette action sera irréversible."
        id={projectId}
      />
    </CardActions>
  );
};
export default ProjectDeleteManage;
