import { RootState } from "../../Interface/Interface"; 

export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;

export const selectUser = (state: RootState): { name: string | null; email: string | null } => state.auth.user;

export const selectIsRefreshing = (state: RootState): boolean => state.auth.isRefreshing;
