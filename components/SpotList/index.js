import useSWR from "swr";
import LoadingSpinner from "../LoadingSpinner";
import { SpotsList, Spot, SpotLink, NoEntryMessage } from "./style";
import Error from "../Error";

export default function SpotList() {
  const { data: spots, error } = useSWR("/api/spots");

  if (error) {
    if (error.status === 401) {
      return <Error role="alert">PLEASE LOGIN TO ACCESS YOUR DATA</Error>;
    }
    return <Error role="alert">FAILED TO LOAD SPOTS</Error>;
  }

  if (!spots) {
    return <LoadingSpinner role="status" />;
  }

  if (spots.length === 0) {
    return <NoEntryMessage role="status">THERE IS NO ENTRY YET</NoEntryMessage>;
  }

  return (
    <SpotsList>
      {spots.map((spot, index) => {
        const isEven = index % 2 === 0;
        return (
          <Spot isEven={isEven} key={spot._id}>
            <SpotLink
              href={`/spot-information/${spot._id}`}
              aria-label={`View details for ${spot.spotName}`}
            >
              {spot.spotName}
            </SpotLink>
          </Spot>
        );
      })}
    </SpotsList>
  );
}
