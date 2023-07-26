import Header from "../../components/Header";
import NewSpotForm from "../../components/AddSpot";
import Navigation from "../../components/Nav";

export default function NewSpot() {
return (
    <main>
      <Header>Add a new spot</Header>
      <NewSpotForm/>  
      <Navigation/>
    </main>
  );
}
