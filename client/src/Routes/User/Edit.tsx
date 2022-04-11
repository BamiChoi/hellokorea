import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "reducers/auth";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editUser } from "reducers/auth";
import axios from "axios";
import React, { useState } from "react";
import Input from "Components/Input";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import Button from "Components/Button";

interface IProfileForm {
  nickname: string;
  statusMessage: string;
  avatar: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  serverError?: string;
}

function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(loggedInUser);
  const {
    id,
    nickname,
    statusMessage,
    avatar,
    firstname,
    lastname,
    birthdate,
  } = user || {};
  const [newAvatar, setNewAvatar] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IProfileForm>({
    defaultValues: {
      nickname,
      avatar,
      statusMessage,
      firstname,
      lastname,
      birthdate,
    },
    mode: "onBlur",
  });
  const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileUri = reader.result;
      setNewAvatar(`${fileUri!}`);
    };
    reader.readAsDataURL(event.target.files![0]);
  };
  const isValid = async (data: IProfileForm) => {
    let formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("nickname", data.nickname);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("birthdate", data.birthdate);
    formData.append("statusMessage", data.statusMessage);
    await axios
      .post(`/api/users/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        dispatch(editUser({ ...response.data }));
        navigate("/user");
      })
      .catch((error) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      });
  };

  return (
    <Wrapper>
      <div className="w-full flex flex-col items-center justify-center px-10">
        <Title text="Edit my info" />
        <form
          onSubmit={handleSubmit(isValid)}
          encType="multipart/form-data"
          className="h-full px-10 mx-10 rounded-xl w-full bg-cream flex flex-col justify-start items-center py-11"
        >
          <div className="flex justify-start items-center w-full ">
            <img
              alt="avatar"
              src={newAvatar ? newAvatar : "/" + avatar}
              className="bg-white w-32 h-32 rounded-full mb-4"
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
                })}
              />
              <Input
                label="Status Message"
                id="statusMessage"
                type="text"
                errors={errors?.statusMessage?.message}
                required={false}
                register={register("statusMessage")}
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
                  {...register("avatar", {
                    onChange: (event) => onChangeAvatar(event),
                  })}
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
              })}
            />
          </div>
          <Button text="Save Changes" errors={errors.serverError?.message} />
        </form>
      </div>
    </Wrapper>
  );
}

export default Edit;
