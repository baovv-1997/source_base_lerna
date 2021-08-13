import AdminLayout from 'components/admin/layout';
import ThemeWrapper from './themeWrapper';
import adminTheme from 'styles/theme/materialAdmin';
import withAuthentication from 'hocs/withAuthentication';

const LayoutAdmin = ({ children }) => {
  return (
    <ThemeWrapper theme={adminTheme}>
      <AdminLayout>{children}</AdminLayout>
    </ThemeWrapper>
  );
};

const LayoutAdminAuthenticated = withAuthentication(LayoutAdmin);

const LayoutWrapper = (props) => {
  if (props.children.type.layout == 'admin') {
    return <LayoutAdminAuthenticated {...props}>{props.children}</LayoutAdminAuthenticated>;
  }

  return props.children;
};

export default LayoutWrapper;
