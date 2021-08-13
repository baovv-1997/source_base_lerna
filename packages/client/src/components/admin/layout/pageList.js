import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import BookIcon from '@material-ui/icons/Book';

export const pageList = {
  '/admin': {
    title: 'Admin',
    isSub: true,
  },
  '/admin/dashboard': {
    title: 'Dashboard',
    icon: <HomeIcon />,
  },
  '/admin/post': {
    title: 'Post',
    icon: <BookIcon />,
  },
  '/admin/post/add': {
    title: 'Add',
    isSub: true,
  },
  '/admin/settings': {
    title: 'Setting',
    icon: <SettingsIcon />,
  },
};
