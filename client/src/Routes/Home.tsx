import List from "Components/home/List";
import Wrapper from "Components/Wrapper";

function Home() {
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10 space-y-8">
        <List title="공지사항" category="notice" sort="new" />
        <List title="k-pop" category="k-pop" sort="new" />
        <List title="뷰티" category="beauty" sort="new" />
        <List title="여행" category="trip" sort="new" />
        <List title="구인/구직" category="work" sort="new" />
        <List title="학교" category="school" sort="new" />
      </main>
    </Wrapper>
  );
}

export default Home;
