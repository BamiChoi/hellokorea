import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "reducers/auth";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { editUser } from "reducers/auth";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import Button from "Components/Button";
import axios from "axios";
import React, { useState } from "react";

interface IProfile {
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
  const { id } = user;
  const { nickname, statusMessage, avatar, firstname, lastname, birthdate } =
    user || {};
  const [newAvatar, setnewAvatar] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfile>({
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
      if (reader.readyState === 2) {
        const fileUri = reader.result;
        setnewAvatar(`${fileUri!}`);
      }
    };
    reader.readAsDataURL(event.target.files![0]);
  };
  const isValid = async (data: IProfile) => {
    console.log(data);
    let formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("nickname", data.nickname);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("birthdate", data.birthdate);
    formData.append("statusMessage", data.statusMessage);
    await axios
      .post(`/api/user/${id}`, formData)
      .then(function (response) {
        console.log(response.data);
        dispatch(editUser({ ...response.data }));
        navigate("/user");
      })
      .catch(function (error) {
        console.log(error);
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
                <span className="text-warning font-semibold">
                  {errors?.nickname?.message}
                </span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="statusMessage">Status Message</label>
                <input
                  {...register("statusMessage", {
                    required: "Nickname is required",
                  })}
                  type="text"
                  id="stausMessage"
                  className="px-2 py-1"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer  bg-point text-center rounded-md py-1 hover:text-white"
                >
                  Change profile photo
                </label>
                <input
                  {...register("avatar", {
                    onChange: (e) => onChangeAvatar(e),
                  })}
                  id="avatar"
                  type="file"
                  className="hidden"
                ></input>
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
              <span className="text-warning font-semibold">
                {errors?.firstname?.message}
              </span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname">Last name</label>
              <input
                {...register("lastname", { required: "Lastname is required" })}
                type="text"
                id="lastname"
                className="px-2 py-1"
              />
              <span className="text-warning font-semibold">
                {errors?.lastname?.message}
              </span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="birthdate">Birthdate</label>
              <input
                {...register("birthdate", { required: "Birtdate is required" })}
                type="date"
                id="birthdate"
                className="px-2 py-1"
              />
              <span className="text-warning font-semibold">
                {errors?.birthdate?.message}
              </span>
            </div>
          </div>
          <div className="w-full">
            <Button text="Save Changes"></Button>
            <span className="text-warning font-semibold">
              {errors.serverError?.message}
            </span>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default Edit;
