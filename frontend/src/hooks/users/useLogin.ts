import { useMutation } from "@tanstack/react-query";
import userService from "../../services/userService";

const useLogin = () => {
  const {
    mutateAsync: login,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: userService.login,
  });
  return { login, isPending, isError, error, isSuccess };
};

export default useLogin;
