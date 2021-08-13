import { useSelector, useDispatch } from 'react-redux';

const withSnackBar = (Component) => (props) => {
  const appStore = useSelector((state) => state.appStore || {});
  const dispatch = useDispatch();
  const { snackBarConfig } = appStore;

  const handleCloseSnackbar = () => {
    dispatch({
      type: 'APP',
      payload: { snackBarConfig: { isShow: false } },
    });
  };

  return <Component messageConfig={snackBarConfig} handleCloseSnackbar={handleCloseSnackbar} {...props} />;
};

export default withSnackBar;
