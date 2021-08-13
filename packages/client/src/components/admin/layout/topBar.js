import { IconButton, Button, Paper, Typography, Divider } from '@material-ui/core';
import WithMenu from 'components/common/withMenu';
import Avatar from '@material-ui/core/Avatar';
import { useRouter } from 'next/router';
import { pageList } from './pageList';
import clsx from 'clsx';
import { useCallback } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Link from 'next/link';

const TopBar = ({ logout }) => {
  const Router = useRouter();
  const renderBreadCrumps = useCallback(() => {
    const urlPath = Router.pathname;
    const listUrlPath = urlPath.split('/');
    let listBreadCrump = [];

    let pageDataRoot = pageList[urlPath];
    if (!pageDataRoot) {
      return;
    }

    listUrlPath.forEach((subPath, index) => {
      const link = listUrlPath.slice(0, index + 1).join('/');
      const pageData = pageList[link];
      if (!pageData) {
        return;
      }

      const hasChevron = listBreadCrump.length > 0;
      const isTheLastPath = index == listUrlPath.length - 1;

      const breadCrump = (
        <div key={index} className="flex items-center">
          {hasChevron && <ChevronRightIcon fontSize="small" className="text-gray-700 px-1" />}
          <Typography component="p" className={clsx('', { 'text-gray-400': !isTheLastPath })} key={index}>
            {pageData.title}
          </Typography>
        </div>
      );

      const breadCrumpWithLink = isTheLastPath ? (
        breadCrump
      ) : (
        <Link href={link} key={index}>
          <a href={link} className="no-underline flex flex-row items-center">
            {breadCrump}
          </a>
        </Link>
      );

      listBreadCrump = [...listBreadCrump, breadCrumpWithLink];
    });

    return listBreadCrump;
  }, [Router]);

  return (
    <div className="flex justify-between px-2 w-full h-[50px] border-b border-solid border-gray-300 bg-white">
      <div className="h-full ml-5">
        <div className="flex h-full items-center pl-5">{renderBreadCrumps()}</div>
      </div>
      <WithMenu
        menu={
          <Paper className="p-1" elevation={5}>
            <div className="p-2">
              <Button className="hover:bg-orange-200" fullWidth>
                <Typography align="left" className="w-full">
                  Change password
                </Typography>
              </Button>
            </div>
            <Divider />
            <div className="p-2 ">
              <Button className="hover:bg-orange-200" fullWidth onClick={logout}>
                <Typography align="left" className="w-full">
                  Logout
                </Typography>
              </Button>
            </div>
          </Paper>
        }
      >
        <div className="flex h-full items-center">
          <Typography className="text-sm ">Admin</Typography>
          <IconButton className="mr-5" size="small" disabled={false}>
            <Avatar className="bg-pink-500 w-8 h-8 ml-2" />
          </IconButton>
        </div>
      </WithMenu>
    </div>
  );
};

export default TopBar;
