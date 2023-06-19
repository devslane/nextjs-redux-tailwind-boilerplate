import jwt_decode from 'jwt-decode';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { Store } from 'redux';
// helper classes
import { BaseError } from 'classes/BaseError';
// helper
import Utils from 'utils/Utils';
// constants
import { getDefaultRoute } from 'constants/DefaultRoutes';
import NextRouteConfig from 'constants/NextRouteConfig';
import { StatusCodes } from 'constants/status-codes';
import { Roles } from 'enums/Roles';
// services
import storageService from 'services/StorageService';
// store
import { authFetchMeAction } from 'store/actions/auth.action';
import { AppState } from 'store/reducers';

/**
 * This is a TypeScript function that handles authentication and authorization for server-side
 * rendering in Next.js, with options for allowed roles and public access.
 * @param store - The Redux store for the application.
 * @param {null | ((context: GetServerSidePropsContext) => Promise<any>)} [callback] - The `callback`
 * parameter is an optional function that can be passed to `nextAuth` as an argument. It is a function
 * that takes a `GetServerSidePropsContext` object as its argument and returns a Promise that resolves
 * to an object. This object can contain any data that needs to be
 * @param [config] - The `config` parameter is an optional object that can contain the following
 * properties:
 * `dataKey?: string;`
 * `allowedRoles?: Roles[];`
 * `allowPublic?: boolean;`
 * @example
 * export const getServerSideProps = wrapper.getServerSideProps((store) =>
  nextAuth(store, null, { allowPublic: false, allowedRoles: [Roles.ADMIN] })
);
 * @returns A higher-order function that takes in a `store`, `callback`, and `config` as arguments and
 * returns a `GetServerSideProps` function. The returned function takes in a `context` object as an
 * argument and returns a `GetServerSidePropsResult` object. The `GetServerSidePropsResult` object can
 * either have a `props` property containing a `serverData` object
 */
const nextAuth =
  (
    store: Store<AppState>,
    callback?: null | ((context: GetServerSidePropsContext) => Promise<any>),
    config?: {
      dataKey?: string;
      allowedRoles?: Roles[];
      allowPublic?: boolean;
    }
  ): GetServerSideProps =>
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<any>> => {
    storageService.setCookies(context.req.headers.cookie);

    try {
      let serverData: any = {
        query: context.query,
        params: Utils.sanitizeObject(context.params),
      };

      let userType = null;
      let userId = null;
      let tokenExpired = true;

      // checking token expiration
      const authToken = await storageService.getAuthToken();

      if (authToken) {
        const decoded: any = jwt_decode(authToken || '');
        const current = Math.floor(Date.now() / 1000);
        tokenExpired = (decoded?.exp || 0) - current < 600;
        if (!tokenExpired) {
          userType = decoded?.userType;
          userId = decoded?.id;
        }
      }

      serverData.userType = userType;
      serverData.userId = userId;
      serverData.tokenExpired = tokenExpired;

      if (!tokenExpired && authToken && !store.getState().auth.userID) {
        store.dispatch(authFetchMeAction());
        serverData = {
          ...serverData,
        };
      }

      if (
        (config?.allowedRoles || []).includes(userType) ||
        config?.allowPublic
      ) {
        if (callback) {
          serverData = {
            ...serverData,
            [config?.dataKey || 'data']: await callback?.(context),
          };
        }

        if (!serverData?.authUser && !tokenExpired && authToken) {
          serverData = {
            ...serverData,
          };
        }

        return {
          props: {
            serverData,
          },
        };
      }

      return {
        redirect: {
          permanent: false,
          destination: getDefaultRoute(userType),
        },
      };
    } catch (e: any) {
      if (e.status === StatusCodes.UNAUTHORIZED) {
        return {
          redirect: {
            permanent: false,
            destination: NextRouteConfig.logout,
          },
        };
      }

      return {
        props: {
          error: BaseError.toJSON(e),
        },
      };
    }
  };

export default nextAuth;
