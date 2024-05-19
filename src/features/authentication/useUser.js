import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // console.log(user, "user in useUser");
  return {
    user,
    isLoading,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
}
