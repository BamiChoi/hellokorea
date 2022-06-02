import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, logout } from "reducers/user";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import Button from "Components/Button";
import Input from "Components/Input";
import { useMutation } from "react-query";
import { changePassword } from "api/userApi";

export interface IPasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  newPassword2: string;
  serverError?: string;
}

interface IPasswordChangeMutation {
  id: string;
  data: IPasswordChangeForm;
}

interface IPasswordChangeError {
  response: {
    data: {
      state: string;
      field: "currentPassword" | "newPassword2" | "serverError";
      message: string;
    };
  };
}

function Password() {
  const user = useSelector(loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IPasswordChangeForm>({ mode: "onBlur" });
  const newPassword = watch("newPassword");
  const { isLoading, mutate } = useMutation(
    ({ id, data }: IPasswordChangeMutation) => changePassword(id, data),
    {
      onSuccess: () => {
        window.alert("Password change is success. Please Login again");
        dispatch(logout());
        navigate("/login");
      },
      onError: (error: IPasswordChangeError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValid = async (data: IPasswordChangeForm) => {
    const id = user.id;
    mutate({ id, data });
  };
  return (
    <Wrapper>
      <main className="w-full flex flex-col items-center justify-center px-10">
        <Title text="Change password"></Title>
        <form
          onSubmit={handleSubmit(isValid)}
          className="h-full px-10 mx-10 rounded-xl w-full bg-cream flex flex-col justify-start items-center py-11 space-y-2"
        >
          <svg
            className="w-32 h-32rounded-md text-powermain"
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
          <Input
            label="Current Password"
            id="currentPassword"
            type="password"
            errors={errors?.currentPassword?.message}
            required
            register={register("currentPassword", {
              required: "Current password is required",
            })}
          />
          <Input
            label="New Password"
            id="newPassword"
            type="password"
            errors={errors?.newPassword?.message}
            required
            register={register("newPassword", {
              required: "New password is required",
            })}
          />
          <Input
            label="Confirm New Password"
            id="newPassword2"
            type="password"
            errors={errors?.newPassword2?.message}
            required
            register={register("newPassword2", {
              required: "Fill this blank for confirming password",
              validate: (value) =>
                value === newPassword || "New Password is not matched",
            })}
          />

          <Button text="Change Password" errors={errors.serverError?.message} />
        </form>
      </main>
    </Wrapper>
  );
}

export default Password;
