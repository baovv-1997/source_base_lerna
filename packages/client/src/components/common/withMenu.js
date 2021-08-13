import React, { useState } from 'react';
import { isFunction } from 'lodash';
import { ClickAwayListener } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

const WithMenu = ({ menu, open: openProp, ClickAwayToClose, children: element, placement }) => {
  const [open, setOpen] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  React.useEffect(() => {
    if (!ClickAwayToClose) {
      return;
    }
    document.addEventListener('mousedown', handleClose);

    return () => document.removeEventListener('mousedown', handleClose);
  }, []);

  const newElementComponent = () => {
    if (!React.isValidElement(element)) {
      return null;
    }

    const { onClick: onClickOrig, ...propsRes } = element.props;

    const handleClick = (event) => {
      if (isFunction(onClickOrig)) {
        onClickOrig(event);
      }

      handleToggle(event);
    };

    return React.cloneElement(element, {
      ...propsRes,
      onClick: handleClick,
    });
  };

  return (
    <>
      {newElementComponent()}
      <Popover
        placement={placement}
        open={open || false}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        disablePortal
        className="z-10"
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transitionDuration={200}
        elevation={1}
      >
        <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleClose}>
          {menu}
        </ClickAwayListener>
      </Popover>
    </>
  );
};

export default WithMenu;
