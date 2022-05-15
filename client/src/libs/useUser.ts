import { getProfile } from "api/userApi";
import { useState } from "react";
import { useQuery } from "react-query";
import { IUser } from "reducers/auth";
import { IActivities } from "Routes/User/Profile";
import { handleErrorResponse } from "./handleError";

interface IProfileResponse {
  data: {
    status: string;
    user: IUser;
    activities: IActivities;
  };
}

export const useUser = (userId: string) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data } = useQuery<IProfileResponse>(
    [userId, "getProfile"],
    () => getProfile(userId),
    {
      retry: false,
      // initialData 설정하여 /user에서 얻은 데이터가 캐시에 있을 경우 그대로 쓰기
      onError: (error) => {
        const message = handleErrorResponse(error);
        setErrorMessage(message);
      },
    }
  );
  return { isLoading, data, errorMessage };
};
