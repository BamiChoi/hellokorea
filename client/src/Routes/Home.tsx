import List from "Components/home/List";
import Wrapper from "Components/Wrapper";

function Home() {
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10 space-y-8">
        <List title="notice" category="notice" sort="new" />
        <List title="beauty" category="beauty" sort="new" />
      </main>
    </Wrapper>
  );
}

export default Home;
