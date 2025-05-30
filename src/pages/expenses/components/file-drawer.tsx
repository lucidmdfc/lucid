import * as React from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Star01Icon from '@untitled-ui/icons-react/build/esm/Star01';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Avatar from '@mui/material/Avatar';
import { backdropClasses } from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';

import { bytesToSize } from 'src/utils/bytes-to-size';

import { ItemIcon } from './item-icon';
import { ListItem } from '@mui/material';
import PdfViewer from 'src/components/pdf-viewer/pdf-viewer';
// import { ItemTags } from './item-tags';
// import { ItemShared } from './item-shared';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
export type ItemType = 'file' | 'folder';

export interface Item {
  id: string;
  author?: {
    avatar?: string;
    name?: string;
  };
  createdAt?: number | null;
  extension?: string;
  secondaryText?: string;
  isFavorite?: boolean;
  isPublic?: boolean;
  items?: Item[];
  itemsCount?: number;
  name: string;
  shared?: {
    avatar?: string;
    name?: string;
  }[];
  size: number;
  tags?: string[];
  type: ItemType;
  updatedAt?: number | null;
  url?: string;
}

interface ItemDrawerProps {
  items?: Item[];
  onClose?: () => void;
  onDelete?: (itemId: string) => void;
  onTagsChange?: (itemId: string, value: string[]) => void;
  open?: boolean;
  secondary?: boolean;
}

export const FileDrawer: FC<ItemDrawerProps> = (props) => {
  const { items, onClose, onDelete, onTagsChange, open = false, secondary } = props;
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  let content: JSX.Element | null = null;

  if (items) {
    // const size = bytesToSize(item.size);
    // const createdAt = item.createdAt && format(item.createdAt, 'MMM dd, yyyy HH:mm');
    // const updatedAt = item.updatedAt && format(item.updatedAt, 'MMM dd, yyyy HH:mm');

    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ p: 3 }}
        >
          <IconButton onClick={onClose}>
            <SvgIcon fontSize="small">
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Divider />
        <Box
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.500' : 'neutral.300',
              borderRadius: 1,
              borderStyle: 'dashed',
              borderWidth: 1,
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
              p: 3,
            }}
          >
            <ItemIcon
              type="file"
              extension="pdf"
            />
          </Box>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">Files</Typography>
          </Stack>
          <Grid
            xs={12}
            md={6}
          >
            {items.length > 0 ? (
              items.map((item) => (
                <Box key={item.id}>
                  <Demo>
                    <List dense={false}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => setPdfUrl(item.url || null)}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <PictureAsPdfIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={secondary ? item.secondaryText : null}
                        />
                      </ListItem>
                    </List>
                  </Demo>
                </Box>
              ))
            ) : (
              <Box>
                <Demo>
                  <List dense={false}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          disabled={true}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PictureAsPdfIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Aucun fichier" />
                    </ListItem>
                  </List>
                </Demo>
              </Box>
            )}
          </Grid>
        </Box>
        {pdfUrl && (
          <PdfViewer
            pdfUrl={pdfUrl}
            open={true}
            onClose={() => setPdfUrl(null)}
          />
        )}
      </div>
    );
  }

  return (
    <Drawer
      anchor="right"
      ModalProps={{
        sx: {
          [`& .${backdropClasses.root}`]: {
            background: 'transparent !important',
          },
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400,
        },
      }}
    >
      {content}
    </Drawer>
  );
};

FileDrawer.propTypes = {
  // @ts-ignore
  item: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onTagsChange: PropTypes.func,
  open: PropTypes.bool,
};
