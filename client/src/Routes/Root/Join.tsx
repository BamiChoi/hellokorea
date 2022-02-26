import { FieldErrors, useForm } from "react-hook-form";
import Wrapper from "Components/Wrapper";
import axios from "axios";

axios.defaults.url = "http://127.0.0.1:4000/api";

interface IJoin {
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  nickname: string;
  password: string;
  password2: string;
}

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoin>();
  const isValid = async (data: IJoin) => {
    const response = await axios
      .post("api/user/join", {
        email: data.email,
        nickname: data.nickname,
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate: data.birthdate,
        pasword: data.password,
        password2: data.password2,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const isInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <Wrapper>
      <div className="w-full h-full flex flex-col justify-center items-center pt-8">
        <h1 className="text-main mb-5 text-3xl">Join</h1>
        <form
          onSubmit={handleSubmit(isValid, isInvalid)}
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
              {...register("password", { required: "Password is required" })} // TO DO: Password pattern validation
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
              })}
              type="password"
              id="password2"
              className="border-2 border-main px-2 py-1 w-full"
            />
            <span className="text-warning font-semibold">
              {errors?.password2?.message}
            </span>
          </div>
          <div className="w-full">
            <button className="bg-main text-white hover:bg-powermain h-12 mt-4 w-full rounded-md">
              Join
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default Join;
