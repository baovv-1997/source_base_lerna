import Snackbar from 'components/common/snackbar';

const Index = ({ children }) => {
  return (
    <>
      <Snackbar />
      {children}
    </>
  );
};

export default Index;
