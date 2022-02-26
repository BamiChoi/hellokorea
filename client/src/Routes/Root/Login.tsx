import { useForm } from "react-hook-form";
import Wrapper from "Components/Wrapper";

function Login() {
  return (
    <Wrapper>
      <div className="w-full h-full flex justify-center items-center">
        <form className="flex flex-col h-72 bg-main justify-center p-10 rounded-xl mt-24 w-96">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md h-8 px-2 py-1 mb-4"
            type="text"
            id="email"
          />
          <label htmlFor="password">Pasword</label>
          <input
            className="rounded-md h-8 px-2 py-1 mb-4"
            type="password"
            id="password"
          />
          <button className="bg-point rounded-xl h-10 mt-4  cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </Wrapper>
  );
}

export default Login;
