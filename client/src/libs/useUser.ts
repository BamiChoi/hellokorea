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
      onError: (error) => {
        const message = handleErrorResponse(error);
        setErrorMessage(message);
      },
    }
  );
  return { isLoading, data, errorMessage };
};
