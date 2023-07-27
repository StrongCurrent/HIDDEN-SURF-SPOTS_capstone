import Header from "../../components/Header";
import SpotInfo from "../../components/SpotInfo";
import { useRouter } from "next/router";
import Navigation from "../../components/Nav";

export default function SpotInformation() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <h2>Spot not found</h2>;
  }

  return (
    <main>
      <Header>Spot Information</Header>
      <SpotInfo spotId={id} />
      <Navigation />
    </main>
  );
}
