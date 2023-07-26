import Header from "../components/Header";
import SpotList from "../components/SpotList";
import Navigation from "../components/Nav";

export default function Home() {
  return (
    <main>
      <Header>Your Hidden Spots</Header>
      <SpotList />
      <Navigation />
    </main>
  );
}
