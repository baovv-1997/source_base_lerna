import TopBar from './topBar';
import SidebarMenu from './sidebarMenu';
import { useDispatch } from 'react-redux';
import actions from 'stores/actions';

const Index = ({ children }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.authentication.logout());
  };

  return (
    <div className="flex min-h-full overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
      <SidebarMenu />
      <div className="flex-1 flex flex-col">
        <TopBar logout={logout} />
        <main className="flex flex-col flex-1 p-6 pt-0 relative">{children}</main>
      </div>
    </div>
  );
};

export default Index;
