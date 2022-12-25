import { createSelector } from 'reselect';
import { authSelector } from './app.selectors';

export const meError = createSelector(
  [authSelector],
  (authState) => authState.error
);

export const meLoading = createSelector(
  [authSelector],
  (authState) => authState.loading
);

export const meIdSelector = createSelector(
  [authSelector],
  (authState) => authState.userID
);
