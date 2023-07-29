import LoadingSpinner from "../LoadingSpinner";
import { SpotsList, Spot, NoEntryMessage } from "./style";
import useSWR from "swr";
import { ErrorMessage } from "../Error/style";

export default function SpotList() {
  const { data: spots, error } = useSWR("/api/spots");

  if (error) {
    return <ErrorMessage>Failed to load spots</ErrorMessage>;
  }

  if (!spots) {
    return <LoadingSpinner/>;
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