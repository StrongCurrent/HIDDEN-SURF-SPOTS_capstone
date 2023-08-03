import Header from "../../components/Header";
import SpotInfo from "../../components/SpotInfo";
import { useRouter } from "next/router";
import Navigation from "../../components/Nav";
import Error from "../../components/Error";
import MainContent from "../../components/MainContent";

export default function SpotInformation() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <Error>Spot not found</Error>;
  }

  return (
    <MainContent>
      <Header>Spot Information</Header>
      <SpotInfo spotId={id} />
      <Navigation />
    </MainContent>
  );
}
