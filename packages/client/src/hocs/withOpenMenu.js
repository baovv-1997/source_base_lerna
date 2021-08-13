import { useSelector, useDispatch } from 'react-redux';

const withOpenMenu = (Component) => (props) => {
  const { appStore } = useSelector((state) => state.authenticationStore || {});
  const dispatch = useDispatch();

  const handleSetOpenMenuSideBar = (isOpen) => {
    dispatch({ type: 'APP', payload: { isOpenMenuSideBar: isOpen } });
  };

  return (
    <Component
      {...props}
      isOpenMenuSideBar={appStore?.isOpenMenuSideBar}
      setOpenMenuSideBar={handleSetOpenMenuSideBar}
    />
  );
};

export default withOpenMenu;
