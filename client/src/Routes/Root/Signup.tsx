import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import Button from "Components/Button";

interface IJoin {
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  nickname: string;
  password: string;
  password2: string;
  serverError?: string;
}

function Join() {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IJoin>({ mode: "onBlur" });
  const password = watch("password");
  const isValid = async (data: IJoin) => {
    const {
      email,
      nickname,
      firstname,
      lastname,
      birthdate,
      password,
      password2,
    } = data;
    await axios
      .post("/api/user", {
        email,
        nickname,
        firstname,
        lastname,
        birthdate,
        password,
        password2,
      })
      .then(function (response) {
        navigate("/login");
      })
      .catch(function (error) {
        const { field, message } = error.response.data;
        setError(field, { message });
      });
  };
  return (
    <Wrapper>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Title text="Sign up" />
        <form
          onSubmit={handleSubmit(isValid)}
          className="flex flex-col justify-center px-5 pt-10 pb-8  rounded-md space-y-3 border-2 border-main w-96"
        >
          <div className="w-full">
            <label htmlFor="email" className="w-40 text-center">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                  message: "It is not valid email address",
                },
              })}
              type="email"
              id="email"
              className="border-2 border-main px-2 py-1 w-full"
            />
            <span className="text-warning font-semibold">
              {errors?.email?.message}
            </span>
          </div>
          <div className="w-full">
            <label htmlFor="firstname" className="w-40 text-center">
              First Name
            </label>
            <input
              {...register("firstname", { required: "First name is required" })}
              type="text"
              id="firstname"
              className="border-2 border-main px-2 py-1 w-full"
            />
            <span className="text-warning font-semibold">
              {errors?.firstname?.message}
            </span>
          </div>
          <div className="w-full">
            <label htmlFor="lastname" className="w-40 text-center">
              Last Name
            </label>
            <input
              {...register("lastname", { required: "Lastname is required" })}
              type="text"
              id="lastname"
              className="border-2 border-main px-2 py-1 w-full"
            />
            <span className="text-warning font-semibold">
              {errors?.lastname?.message}
            </span>
          </div>
          <div className="w-full">
            <label htmlFor="birthdate" className="w-40 text-center">
              Birthdate
            </label>
            <input
              {...register("birthdate", { required: "Birtdate is required" })}
              type="date"
              id="birtdate"
              className="border-2 border-main px-2 py-1 w-full"
            />
            <span className="text-warning font-semibold">
              {errors?.birthdate?.message}
            </span>
          </div>
          <div className="w-full">
            <label htmlFor="nickname" className="w-40 text-center">
              Nickname
            </label>
            <input
              {...register("nickname", { required: "Nickname is required" })}
              type="text"
              id="nickname"
              className="border-2 border-main px-2 py-1 w-full"
            />
            <span className="text-warning font-semibold">
              {errors?.nickname?.message}
            </span>
          </div>
          <div className="w-full">
            <label htmlFor="password" className="w-40 text-center">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              className="border-2 border-main px-2 py-1 w-full"
            />
            <span className="text-warning font-semibold">
              {errors?.password?.message}
            </span>
          </div>
          <div className="w-full">
            <label htmlFor="password2" className="w-40 text-center">
              Confirm Password
            </label>
            <input
              {...register("password2", {
                required: "Fill this blank for confirming password",
                validate: (value) =>
                  value === password || "Password is not matched",
              })}
              type="password"
              id="password2"
              className="border-2 border-main px-2 py-1 w-full"
            />
            <span className="text-warning font-semibold">
              {errors?.password2?.message}
            </span>
          </div>
          <Button text="Create Account" errors={errors.serverError?.message} />
        </form>
      </div>
    </Wrapper>
  );
}

export default Join;
