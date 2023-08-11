import Header from "../components/Header";
import CreateSpot from "../components/CreateSpot";
import Navigation from "../components/Nav";
import MainContent from "../components/MainContent";

export default function NewSpot() {
return (
    <MainContent>
      <Header>create a new spot</Header>
      <CreateSpot/>  
      <Navigation/>
    </MainContent>
  );
}
