import Header from "../../components/Header";
import NewSpotForm from "../../components/AddSpot";
import Navigation from "../../components/Nav";
import MainContent from "../../components/MainContent";

export default function NewSpot() {
return (
    <MainContent>
      <Header>Add a new spot</Header>
      <NewSpotForm/>  
      <Navigation/>
    </MainContent>
  );
}
