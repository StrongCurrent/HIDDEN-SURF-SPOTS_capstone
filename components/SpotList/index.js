import { SpotsList, Spot, NoEntryMessage } from "./style";
import useSWR from "swr";

export default function SpotList() {
  const { data: spots, error } = useSWR("/api/spots");

  if (error) {
    return <h2>Failed to load spots</h2>;
  }

  if (!spots) {
    return <h2>Loading...</h2>;
  }

  if (spots.length === 0) {
    return <NoEntryMessage>there is no entry yet</NoEntryMessage>;
  }
  return (
    <SpotsList>
      {spots.map((spot, index) => {
        const isEven = index % 2 === 0;
        return (
          <a
            key={spot._id}
            href={`/SpotInformation/${spot._id}`}
            style={{
              color: "#2f6673",
              textDecoration: "none",
              display: "block",
            }}
          >
            <Spot isEven={isEven}>{spot.spotName}</Spot>
          </a>
        );
      })}
    </SpotsList>
  );
}