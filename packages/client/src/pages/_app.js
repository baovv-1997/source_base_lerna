import PropTypes from 'prop-types';
import Router from 'next/router';
import 'styles/index.css';
import { useEffect } from 'react';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Root from 'containers/root';
import { Provider } from 'react-redux';
import store from 'stores';
import LayoutWrapper from 'containers/layoutWrapper';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <Root>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </Root>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
