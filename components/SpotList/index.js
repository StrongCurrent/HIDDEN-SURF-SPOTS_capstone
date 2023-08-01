import useSWR from "swr";
import LoadingSpinner from "../LoadingSpinner";
import { SpotsList, Spot, NoEntryMessage } from "./style";
import Error from "../Error";

export default function SpotList() {
  const { data: spots, error } = useSWR("/api/spots");

  if (error) {
    return <Error>Failed to load spots</Error>;
  }

  if (!spots) {
    return <LoadingSpinner />;
  }

  if (spots.length === 0) {
    return <NoEntryMessage>There is no entry yet</NoEntryMessage>;
  }

  return (
    <SpotsList>
      {spots.map((spot, index) => {
        const isEven = index % 2 === 0;
        return (
          <Spot isEven={isEven} key={spot._id}>
            <a
              href={`/SpotInformation/${spot._id}`}
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {spot.spotName}
            </a>
          </Spot>
        );
      })}
    </SpotsList>
  );
}
