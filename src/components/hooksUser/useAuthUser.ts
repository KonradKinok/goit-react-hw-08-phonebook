import { useSelector } from "react-redux";
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../redux/authUser/selectorsUser.auth";
import { RootState } from "../Interface/Interface";;
import { User } from "../Interface/Interface";

export const useAuthUser = () => {
  const isLoggedIn: boolean = useSelector((state: RootState) => selectIsLoggedIn(state));
  const isRefreshing: boolean = useSelector((state: RootState) => selectIsRefreshing(state));
  const user: User = useSelector((state: RootState) => selectUser(state));
  console.log("useAuthUser->selectUser", user);
  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};
