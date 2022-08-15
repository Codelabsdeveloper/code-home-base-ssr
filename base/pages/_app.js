import '../styles/globals.css';
import { object } from 'prop-types';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: object.isRequired,
  pageProps: object.isRequired,
};
