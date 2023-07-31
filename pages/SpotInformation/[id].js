import Header from "../../components/Header";
import SpotInfo from "../../components/SpotInfo";
import { useRouter } from "next/router";
import Navigation from "../../components/Nav";
import Error from "../../components/Error";

export default function SpotInformation() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <Error>Spot not found</Error>;
  }

  return (
    <main>
      <Header>Spot Information</Header>
      <SpotInfo spotId={id} />
      <Navigation />
    </main>
  );
}
