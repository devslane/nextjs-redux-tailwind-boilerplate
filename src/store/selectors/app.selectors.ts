import { AppState } from '../reducers';

export const userSelector = (state: AppState) => state.user;
export const authSelector = (state: AppState) => state.auth;
