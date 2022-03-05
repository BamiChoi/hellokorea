import { useSelector } from "react-redux";
import { loggedInUser } from "reducers/auth";
import { useForm } from "react-hook-form";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import Button from "Components/Button";

interface IProfile {
  nickname: string;
  statusMessage: string;
  firstname: string;
  lastname: string;
  birthdate: string;
}

function Edit() {
  const user = useSelector(loggedInUser);
  const { nickname, statusMessage, firstname, lastname, birthdate } =
    user || {};
  console.log(lastname);
  const { register, handleSubmit } = useForm<IProfile>({
    defaultValues: {
      nickname,
      statusMessage,
      firstname,
      lastname,
      birthdate,
    },
    mode: "onBlur",
  });
  return (
    <Wrapper>
      <div className="w-full flex flex-col items-center justify-center px-10">
        <Title text="Edit my info" />
        <form className="h-full px-10 mx-10 rounded-xl w-full bg-cream flex flex-col justify-start items-center py-11">
          <div className="flex justify-start items-center w-full ">
            <div className="bg-white w-32 h-32 rounded-full mb-4"></div>
            <div className="flex flex-col ml-5 space-y-2">
              <div className="flex flex-col w-full">
                <label htmlFor="nickname">Nickname</label>
                <input
                  {...register("nickname", {
                    required: "Nickname is required",
                  })}
                  type="text"
                  id="nickname"
                  className="px-2 py-1"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="statisMessage">Status Message</label>
                <input type="text" id="statisMessage" className="px-2 py-1" />
              </div>
            </div>
          </div>
          <div className="w-full pt-10 space-y-4 mb-10">
            <div className="flex flex-col">
              <label htmlFor="firstname">First name</label>
              <input
                {...register("firstname", {
                  required: "First name is required",
                })}
                type="text"
                id="firstname"
                className="px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname">Last name</label>
              <input
                {...register("lastname", { required: "Lastname is required" })}
                type="text"
                id="lastname"
                className="px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="birthdate">Birthdate</label>
              <input
                {...register("birthdate", { required: "Birtdate is required" })}
                type="date"
                id="birthdate"
                className="px-2 py-1"
              />
            </div>
          </div>
          <Button text="Save Changes"></Button>
        </form>
      </div>
    </Wrapper>
  );
}

export default Edit;
