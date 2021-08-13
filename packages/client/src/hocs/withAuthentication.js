import { redirect } from 'utilities/helper';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const LoadingScreen = dynamic(import('components/common/appLoading'), { ssr: false });

const withAuthentication = (Component) => (props) => {
  const authenticationStore = useSelector((state) => state.authenticationStore || {});
  const Router = useRouter();

  if (!authenticationStore.loaded) {
    return <LoadingScreen />;
  }

  if (!authenticationStore.isAuthenticated && Router.pathname !== '/login') {
    redirect('/login');
    return null;
  }

  if (authenticationStore.isAuthenticated && Router.pathname === '/login') {
    redirect('/admin');
    return null;
  }

  return <Component authenticationStore={authenticationStore} logout={authenticationStore.logout} {...props} />;
};

export default withAuthentication;
