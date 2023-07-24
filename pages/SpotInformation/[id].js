import Header from "../../components/Header";
import SpotInfo from "../../components/SpotInfo";
import { useRouter } from "next/router";
import mockData from "../../lib/mock-data";

export default function SpotInformation() {
  const router = useRouter();
  const { id } = router.query;

  const spot = mockData.find((spot) => spot.id === Number(id));

  if (!spot) {
    return <div>Spot not found</div>;
  }

  return (
    <main>
      <Header>Spot Information</Header>
      <SpotInfo spot={spot} />
    </main>
  );
}
