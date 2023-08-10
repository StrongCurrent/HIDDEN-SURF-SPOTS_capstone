import Header from "../../components/Header";
import MainContent from "../../components/MainContent";
import Navigation from "../../components/Nav";
import Profile from "../../components/Profile";

export default function ProfilePage() {
  return (
    <MainContent>
      <Header>Your Profile</Header>
      <Profile />
      <Navigation />
    </MainContent>
  );
}
