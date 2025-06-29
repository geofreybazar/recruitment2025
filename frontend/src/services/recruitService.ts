import { axiosJWT } from "./AxiosCreate";
import type { RecruitType } from "../utilities/zodSchema";

interface addRecruitData extends RecruitType {
  image: string;
}

const addRecruit = async (data: addRecruitData) => {
  const apiClient = await axiosJWT("/recruit_api");
  const response = await apiClient.post("/", data);
  return response.data;
};

export default {
  addRecruit,
};
