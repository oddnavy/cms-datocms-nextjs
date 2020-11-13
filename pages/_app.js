import { PropTypes } from 'prop-types';
import { ReactComponentsProvider } from '@inlight-media/react-components';

import { Link } from '../components/link';

const App = ({ Component, pageProps }) => {
  return (
    <ReactComponentsProvider linkComponent={Link}>
      <Component {...pageProps} />
    </ReactComponentsProvider>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
