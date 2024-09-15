//Navigation
export interface AuthUser {
 isLoggedIn: boolean;
}

//useAuthUser
//authUser/sliceUser.auth.ts
export interface User {
 name: string | null;
 email: string | null;
}

//PrivateRoute
//RestrictedRoute
export interface RouteProps {
 component: React.ElementType;
 redirectTo?: string;
}

//contacts/selectors.ts
//contacts/operations.ts
//contacts/contactsSlice.ts
export interface Contact {
 id: string;
 name: string;
 number: string;
}

//contacts/contactsSlice.ts
export interface ContactsState {
 contacts: Contact[];
 isLoading: boolean;
 error: string | null;
}

//contacts/operations.ts
export interface AddContact {
 name: string;
 number: string;
}

//contacts/filtersSlice.ts
export interface FiltersState {
 status: string;
}

//language/languageSlice.ts
export interface LanguageState {
 language: "en" | "pl"; // Można rozszerzyć o inne języki
}
//redux/store.ts
//authUser/sliceUser.auth.ts
export interface AuthState {
 user: { name: string | null; email: string | null };
 token: string | null;
 isLoggedIn: boolean;
 isRefreshing: boolean;
 error: string | null;
}

//authUser/operationsUser.auth.ts
export interface AuthResponse {
 user: { name: string | null; email: string | null };
 token: string;
}

//authUser/sliceUser.auth.ts
export interface RejectedAction {
 payload: string | null;
}
//contacts/selectors.ts
//authUser/selectorsUser.auth.ts
//language/selectorsLanguage.ts
export interface RootState {
 auth: AuthState;
 contacts: ContactsState;
 filters: FiltersState;
 language: LanguageState;
}

//authUser/operationsUser.auth.ts
export interface AuthCredentials {
 name?: string;
 email: string;
 password: string;
}
