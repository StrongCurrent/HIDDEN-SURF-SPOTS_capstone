import useSWR from "swr";
import LoadingSpinner from "../LoadingSpinner";
import { SpotsList, Spot, SpotLink, NoEntryMessage } from "./style";
import Error from "../Error";

export default function SpotList() {
  const { data: spots, error } = useSWR("/api/spots");

  if (error) {
    return <Error role="alert">Failed to load spots</Error>;
  }

  if (!spots) {
    return <LoadingSpinner role="status"/>;
  }

  if (spots.length === 0) {
    return <NoEntryMessage role="status">There is no entry yet</NoEntryMessage>;
  }

  return (
    <SpotsList>
      {spots.map((spot, index) => {
        const isEven = index % 2 === 0;
        return (
          <Spot isEven={isEven} key={spot._id}>
            <SpotLink href={`/SpotInformation/${spot._id}`} aria-label={`View details for ${spot.spotName}`}>
              {spot.spotName}
            </SpotLink>
          </Spot>
        );
      })}
    </SpotsList>
  );
}
