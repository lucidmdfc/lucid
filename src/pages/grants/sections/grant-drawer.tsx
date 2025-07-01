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
import GrantDetails from '../components/view-grant-details';
import GrantEdit from '../components/edit-grant-form';
import toast from 'react-hot-toast';
import { GetGrantProjectAgreementQuery } from 'src/types/generatedTypes';
type Grant = NonNullable<
  NonNullable<GetGrantProjectAgreementQuery['grant_project_agreementCollection']>['edges']
>[number]['node'];

interface GrantDrawerProps {
  container?: HTMLDivElement | null;
  open?: boolean;
  onClose?: () => void;
  grant?: Grant;
  onUpdateMember: () => void;
}

const GrantDrawer: FC<GrantDrawerProps> = (props) => {
  const { container, onClose, open, grant, onUpdateMember } = props;
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

  if (grant) {
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
            {grant?.projects?.name || 'Projet'}
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
            <GrantDetails
              onApprove={onClose}
              onEdit={handleEditOpen}
              onReject={onClose}
              grant={grant}
            />
          ) : (
            <GrantEdit
              onCancel={handleEditCancel}
              onSave={handleSaveEdit}
              grant={grant}
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
export default GrantDrawer;
GrantDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  order: PropTypes.object,
};
