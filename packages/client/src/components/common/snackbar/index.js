import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import withSnackBar from 'hocs/withSnackBar';

const SnackbarAlert = ({ messageConfig, handleCloseSnackbar }) => {
  if (!messageConfig) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={messageConfig.position}
      open={messageConfig.isShow}
      autoHideDuration={messageConfig.duration}
      onClose={(e, rs) => {
        rs != 'clickaway' && handleCloseSnackbar();
      }}
    >
      <Alert severity={messageConfig.type} className="shadow-md" onClose={handleCloseSnackbar}>
        {messageConfig.content}
      </Alert>
    </Snackbar>
  );
};

SnackbarAlert.propTypes = {
  handleCloseSnackbar: PropTypes.any,
  message: PropTypes.shape({
    content: PropTypes.any,
    duration: PropTypes.any,
    isShow: PropTypes.any,
    position: PropTypes.any,
    type: PropTypes.any,
  }),
};

export default withSnackBar(SnackbarAlert);
