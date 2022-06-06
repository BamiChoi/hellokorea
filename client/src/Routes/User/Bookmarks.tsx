import List from "Components/board/List";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useBookmarks } from "libs/useBookmarks";
import { useSelector } from "react-redux";
import { loggedInUser } from "reducers/user";

function Bookmarks() {
  const user = useSelector(loggedInUser);
  const { isLoading, data, errorMessage } = useBookmarks(user.id);
  console.log(data);
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10">
        <Title text="My Bookmarks" />
        <List data={data} errorMessage={errorMessage} />
      </main>
    </Wrapper>
  );
}

export default Bookmarks;
