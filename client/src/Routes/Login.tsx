import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "reducers/auth";
import Wrapper from "Components/Wrapper";
import axios from "axios";
import Input from "Components/Input";
import Button from "Components/Button";

interface ILoginForm {
  email: string;
  password: string;
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
  const isValid = async (data: ILoginForm) => {
    await axios
      .post("api/session", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const {
          id,
          nickname,
          email,
          firstname,
          lastname,
          birthdate,
          avatar,
          loggedIn,
          statusMessage,
          verified,
        } = response.data;
        navigate("/"); // maximum depth error 때문에 dispatch 보다 위에 올림. 바람직하지 않음.
        dispatch(
          login({
            id,
            nickname,
            email,
            firstname,
            lastname,
            birthdate,
            avatar,
            loggedIn,
            statusMessage,
            verified,
          })
        );
      })
      .catch((error) => {
        const field = error.response.data.field;
        const message = error.response.data.message;
        setError(field, { message });
      });
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
