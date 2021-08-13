import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { isFunction } from 'lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WithModal({ open, setOpen, maxWidth, ...props }) {
  const handleOK = () => {
    setOpen(false);

    if (isFunction(props.handleClickOK)) {
      props.handleClickOK();
    }
  };

  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      TransitionComponent={Transition}
      disableBackdropClick={props.disableBackdropClick}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: `flex flex-column ${props.className}` }}
    >
      {props.titleComponent
        ? props.titleComponent
        : props.title && <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>}
      <div className="overflow-hidden flex-1">{props.children}</div>
      {props.footerComponent ? (
        props.footerComponent
      ) : (
        <DialogActions className="p-5">
          {props.btnCancel && (
            <Button onClick={() => setOpen(false)} color="primary" variant="outlined">
              {props.btnCancel}
            </Button>
          )}
          {props.btnOk && (
            <Button onClick={handleOK} color="primary" className="ml-5 w-32" variant="contained">
              {props.btnOk}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

WithModal.propTypes = {
  btnCancel: PropTypes.any,
  btnOk: PropTypes.any,
  children: PropTypes.any,
  disableBackdropClick: PropTypes.any,
  footerComponent: PropTypes.any,
  handleClickOK: PropTypes.func,
  open: PropTypes.any,
  title: PropTypes.any,
  titleComponent: PropTypes.any,
  className: PropTypes.any,
  setOpen: PropTypes.any,
};
