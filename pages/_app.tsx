import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// store
import wrapper from '../src/store';
// css
import '../src/index.scss';

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ToastContainer
        theme='dark'
        limit={5}
        closeButton={false}
        pauseOnFocusLoss={false}
        toastClassName={`relative flex p-4 rounded-10 tracking-wider justify-between overflow-hidden cursor-pointer font-bold text-sm `}
      />
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default App;
