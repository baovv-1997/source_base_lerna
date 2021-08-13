import { Typography, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Item from './item';
import useToggle from 'hooks/useToggle';
import useWindowSize from 'hooks/useWindowSize';
import { pageList } from 'components/admin/layout/pageList';
import { useEffect } from 'react';

const SidebarMenu = () => {
  const [isOpenMenuSideBar, toggleOpenMenuSideBar] = useToggle(true);
  const windowSize = useWindowSize();
  const isMobileDevice = windowSize.width <= 1024;
  const isHideSideBarContent = isMobileDevice && !isOpenMenuSideBar;

  useEffect(() => {
    if (isMobileDevice) {
      toggleOpenMenuSideBar(false);
    } else {
      toggleOpenMenuSideBar(true);
    }
  }, [isMobileDevice]);

  let sideBarClassName = isOpenMenuSideBar ? 'w-64' : 'w-16';
  if (isHideSideBarContent) {
    sideBarClassName = 'w-0';
  }

  return (
    <aside
      className={`flex transition-all border-r border-solid border-gray-300 duration-200 flex-col top-0 left-0 bottom-0 bg-white ${sideBarClassName}`}
    >
      <div
        className={clsx('flex px-2 items-center border-b border-solid border-gray-300 h-[50px]', {
          'justify-center': !isOpenMenuSideBar,
          'justify-between': isOpenMenuSideBar,
        })}
      >
        {isOpenMenuSideBar && (
          <Typography className="text-primary text-3xl font-bold" component="h2">
            CMS
          </Typography>
        )}
        <IconButton
          className={clsx('self-center', { 'ml-5': isHideSideBarContent })}
          onClick={toggleOpenMenuSideBar}
          size="small"
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon className="text-orange-600 text-3xl" />
        </IconButton>
      </div>
      {!isHideSideBarContent && (
        <div className="flex flex-col mt-6">
          {Object.keys(pageList).map((link, index) => {
            if (pageList[link].isSub) {
              return;
            }
            return (
              <Item
                className="mt-3"
                key={index}
                isOen={isOpenMenuSideBar}
                label={pageList[link].title}
                icon={pageList[link].icon}
                href={link}
              />
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default SidebarMenu;
