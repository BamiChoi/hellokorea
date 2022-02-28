import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Wrapper from "Components/Wrapper";
import axios from "axios";

interface ILogin {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILogin>({ mode: "onBlur" });
  const isValid = async (data: ILogin) => {
    await axios
      .post("api/session", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        const field = error.response.data.field;
        const message = error.response.data.message;
        console.log(field, message);
        setError(field, { message });
        console.log(errors);
      });
  };
  return (
    <Wrapper>
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(isValid)}
          className="flex flex-col h-72 bg-main justify-center p-10 rounded-xl mt-24 w-96 space-y-4"
        >
          <div className="w-full flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                  message: "It is not valid email address",
                },
              })}
              className="rounded-md h-8 px-2 py-1"
              type="email"
              id="email"
            />
            <span className="text-warning font-semibold">
              {errors?.email?.message}
            </span>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              className="rounded-md h-8 px-2 py-1"
              type="password"
              id="password"
            />
            <span className="text-warning font-semibold">
              {errors?.password?.message}
            </span>
          </div>

          <button className="bg-point rounded-xl h-10 mt-4  cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </Wrapper>
  );
}

export default Login;
