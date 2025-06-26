import type { FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import DonorDetails from '../components/view-donor-details';
import DonorEdit from '../components/edit-donor-form';
import toast from 'react-hot-toast';
import { GetDonorsQuery } from 'src/types/generatedTypes';
type Donors = NonNullable<NonNullable<GetDonorsQuery['donorsCollection']>['edges']>[number]['node'];

interface DonorDrawerProps {
  container?: HTMLDivElement | null;
  open?: boolean;
  onClose?: () => void;
  donor?: Donors;
  onUpdateMember: () => void;
}

const ProjectDrawer: FC<DonorDrawerProps> = (props) => {
  const { container, onClose, open, donor, onUpdateMember } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);
  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);
  const handleSaveEdit = useCallback(
    async (id: string, values: {}) => {
      try {
        console.log(id, values, onUpdateMember);

        handleEditCancel();
        if (onClose) {
          onClose();
        }
      } catch (error) {
        console.error('Erreur lors de la modification du membre!: ', error);
      }
    },
    [handleEditCancel, onClose, onUpdateMember]
  );

  let content: JSX.Element | null = null;

  if (donor) {
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
          >
            {donor?.name}
          </Typography>
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          {!isEditing ? (
            <DonorDetails
              onApprove={onClose}
              onEdit={handleEditOpen}
              onReject={onClose}
              donor={donor}
            />
          ) : (
            <DonorEdit
              onCancel={handleEditCancel}
              onSave={handleSaveEdit}
              donor={donor}
            />
          )}
        </Box>
      </div>
    );
  }

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 500,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute',
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400,
          pointerEvents: 'auto',
          position: 'absolute',
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
export default ProjectDrawer;
ProjectDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  order: PropTypes.object,
};
