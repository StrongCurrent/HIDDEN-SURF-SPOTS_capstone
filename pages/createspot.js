import Header from "../components/Header";
import NewSpotForm from "../components/NewSpotForm";
import Navigation from "../components/Nav";
import MainContent from "../components/MainContent";

export default function NewSpot() {
return (
    <MainContent>
      <Header>create a new spot</Header>
      <NewSpotForm/>  
      <Navigation/>
    </MainContent>
  );
}
