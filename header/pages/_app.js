import '../styles/globals.scss';
import { object, func } from 'prop-types';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

MyApp.propTypes = {
  Component: func.isRequired,
  pageProps: object.isRequired,
};
