import Header from "../components/Header";
import SpotList from "../components/SpotList";
import Navigation from "../components/Nav";
import MainContent from "../components/MainContent";

export default function Home() {
  return (
    <MainContent>
      <Header>Hidden Surf Spots</Header>
      <SpotList />
      <Navigation />
    </MainContent>
  );
}