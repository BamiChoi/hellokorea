import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IUser, login } from "reducers/auth";
import Wrapper from "Components/Wrapper";
import Input from "Components/Input";
import Button from "Components/Button";
import { useMutation } from "react-query";
import { loginUser } from "api/sessionApi";

export interface ILoginForm {
  email: string;
  password: string;
  serverError?: string;
}

interface ILoginResponse {
  data: {
    state: string;
    loggedInUser: IUser;
  };
}

interface ILoginError {
  response: {
    data: {
      state: string;
      field: "email" | "password" | "serverError";
      message: string;
    };
  };
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginForm>({ mode: "onBlur" });
  const { isLoading, mutate } = useMutation(
    (data: ILoginForm) => loginUser(data),
    {
      onSuccess: (data: ILoginResponse) => {
        navigate("/");
        dispatch(login(data.data.loggedInUser));
      },
      onError: (error: ILoginError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValid = async (data: ILoginForm) => {
    mutate(data);
  };
  return (
    <Wrapper>
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(isValid)}
          className="flex flex-col h-72 bg-main justify-center p-10 rounded-xl mt-24 w-96 space-y-4"
        >
          <Input
            label="Email"
            id="email"
            type="email"
            required
            errors={errors?.email?.message}
            register={register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                message: "It is not valid email address",
              },
            })}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            required
            errors={errors?.password?.message}
            register={register("password", {
              required: "Password is required",
            })}
          />
          <Button
            text="Login"
            customClassName="bg-point text-black h-10 mt-4 w-full rounded-md"
          />
        </form>
      </div>
    </Wrapper>
  );
}

export default Login;
