import { useMutation } from "@tanstack/react-query";
import recruitService from "../../services/recruitService";

const useAddRecruit = () => {
  const {
    mutateAsync: addRecruit,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: recruitService.addRecruit,
  });
  return { addRecruit, isPending, isError, error, isSuccess };
};

export default useAddRecruit;
