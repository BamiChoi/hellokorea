import { useDispatch, useSelector } from "react-redux";
import { IUser, loggedInUser } from "reducers/auth";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editUser } from "reducers/auth";
import { useEffect, useState } from "react";
import Input from "Components/Input";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import Button from "Components/Button";
import { editProfile } from "api/userApi";
import { useMutation } from "react-query";
import { useUser } from "libs/useUser";
import { queryClient } from "index";

export interface IEditProfileForm {
  nickname: string;
  statusMessage: string;
  avatar: FileList;
  firstname: string;
  lastname: string;
  birthdate: string;
  serverError?: string;
}

interface IEditProfileResponse {
  data: {
    state: string;
    updatedUser: IUser;
  };
}

interface IEditProfileError {
  response: {
    data: {
      state: string;
      field: "nickname" | "serverError";
      message: string;
    };
  };
}

interface IEditProfileMutation {
  id: string;
  formData: any;
}

function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(loggedInUser);
  const { isLoading, data, errorMessage } = useUser(user.id);
  const { isLoading: isEditLoading, mutate } = useMutation(
    ({ id, formData }: IEditProfileMutation) => editProfile(id, formData),
    {
      onSuccess: (data: IEditProfileResponse) => {
        queryClient.invalidateQueries([user.id, "getProfile"]);
        dispatch(editUser({ ...data.data.updatedUser }));
        navigate("/user");
      },
      onError: (error: IEditProfileError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const [avatarPreview, setAvatarPreview] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<IEditProfileForm>({
    mode: "onBlur",
  });
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  const isValid = async (data: IEditProfileForm) => {
    const id = user.id;
    let formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("nickname", data.nickname);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("birthdate", data.birthdate);
    formData.append("statusMessage", data.statusMessage);
    mutate({ id, formData });
  };
  // 컴포넌트 분리
  return (
    <Wrapper>
      <main className="w-full flex flex-col items-center justify-center px-10">
        <Title text="Edit my info" />
        {data?.data.user ? (
          <form
            onSubmit={handleSubmit(isValid)}
            encType="multipart/form-data"
            className="h-full px-10 mx-10 rounded-xl w-full bg-cream flex flex-col justify-start items-center py-11"
          >
            <div className="flex justify-start items-center w-full ">
              <img
                alt="avatar"
                src={
                  avatarPreview ? avatarPreview : "/" + data?.data.user.avatar
                }
                className="bg-white w-32 h-32 rounded-full mb-4 object-cover"
              />
              <div className="flex flex-col ml-5 space-y-2">
                <Input
                  label="Nickname"
                  id="nickname"
                  type="text"
                  errors={errors?.nickname?.message}
                  required
                  register={register("nickname", {
                    required: "Nickname is required",
                    value: data?.data.user.nickname,
                  })}
                />
                <Input
                  label="Status Message"
                  id="statusMessage"
                  type="text"
                  errors={errors?.statusMessage?.message}
                  required={false}
                  register={register("statusMessage", {
                    value: data?.data.user.statusMessage,
                  })}
                />

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer  bg-point text-center rounded-md py-1 hover:text-white flex justify-center"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Change profile image
                  </label>
                  <input
                    {...register("avatar")}
                    id="avatar"
                    type="file"
                    className="hidden"
                  />
                </div>
                <Link to="/user/edit/password">
                  <div className="flex bg-brightgreen text-black rounded-md py-1 cursor-pointer justify-center hover:text-white">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Change password</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full pt-10 space-y-4 mb-10">
              <Input
                label="First name"
                id="firstname"
                type="text"
                errors={errors?.firstname?.message}
                required
                register={register("firstname", {
                  required: "First name is required",
                  value: data?.data.user.firstname,
                })}
              />
              <Input
                label="Last name"
                id="lastname"
                type="text"
                errors={errors?.lastname?.message}
                required
                register={register("lastname", {
                  required: "Last name is required",
                  value: data?.data.user.lastname,
                })}
              />
              <Input
                label="Birthdate"
                id="birthdate"
                type="date"
                errors={errors?.birthdate?.message}
                required
                register={register("birthdate", {
                  required: "Birtdate is required",
                  value: data?.data.user.birthdate,
                })}
              />
            </div>
            <Button text="Save Changes" errors={errors.serverError?.message} />
          </form>
        ) : (
          <div className="flex p-10 justify-center items-center">
            {errorMessage}
          </div>
        )}
      </main>
    </Wrapper>
  );
}

export default Edit;
