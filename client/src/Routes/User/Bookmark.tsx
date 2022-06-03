import List from "Components/board/List";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useBookmark } from "libs/useBookmark";
import { useSelector } from "react-redux";
import { loggedInUser } from "reducers/user";

function Bookmark() {
  const user = useSelector(loggedInUser);
  const { isLoading, data, errorMessage } = useBookmark(user.id);
  console.log(data);
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10">
        <Title text="My Bookmark" />
        <List data={data} errorMessage={errorMessage} />
      </main>
    </Wrapper>
  );
}

export default Bookmark;
