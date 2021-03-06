import React from 'react';
import App, { AppContext, AppInitialProps } from 'next/app';
import { wrapper } from '../src/redux/store';
import '../src/index.scss';

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => ({
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      appProp: ctx.pathname,
    },
  });

  public render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(WrappedApp);
