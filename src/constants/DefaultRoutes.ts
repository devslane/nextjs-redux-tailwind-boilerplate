import NextRouteConfig from 'constants/NextRouteConfig';
import { Roles } from 'enums/Roles';

export const getDefaultRoute = (userType: Roles): string => {
  switch (userType) {
    case Roles.USER:
      return NextRouteConfig.home._ROOT;
    default:
      return '/';
  }
};
