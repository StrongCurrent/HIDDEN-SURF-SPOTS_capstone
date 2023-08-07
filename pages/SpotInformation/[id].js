import Header from "../../components/Header";
import SpotInfo from "../../components/SpotInfo";
import { useRouter } from "next/router";
import Navigation from "../../components/Nav";
import MainContent from "../../components/MainContent";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function SpotInformation() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <LoadingSpinner role="status" />;
  }

  return (
    <MainContent>
      <Header>Spot Information</Header>
      <SpotInfo spotId={id} />
      <Navigation />
    </MainContent>
  );
}
