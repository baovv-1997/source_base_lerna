import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';

const ThemeWrapper = ({ children, theme }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeWrapper.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
};

export default ThemeWrapper;
