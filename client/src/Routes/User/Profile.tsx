import { useSelector } from "react-redux";
import { loggedInUser } from "reducers/auth";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";

function Profile() {
  const user = useSelector(loggedInUser);
  return (
    <Wrapper>
      <div className="w-full flex flex-col items-center">
        <Title text="My page" />
        <div className="h-42  mx-10 rounded-xl w-96 bg-cream flex justify-start items-center box-content py-5 px-5">
          <div className="bg-white w-32 h-32 rounded-full mb-4"></div>
          <div className="flex flex-col ml-14 space-y-4">
            <span>{user}</span>
            <span>Mesasge</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Profile;
