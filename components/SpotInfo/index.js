import useSWR from "swr";
import {
  SpotWrapper,
  SpotName,
  SpotDetails,
  Longitude,
  Latitude,
} from "./style";

export default function SpotInfo({spotId}) {
  const { data: spot, error } = useSWR(`/api/spots?spotId=${spotId}`);
  console.log(error)
  if (error) return <h2>{error.message === 'Spot not found' ? 'Spot not found' : 'Failed to load spot information'}</h2>;
  console.log(error)
  if (!spot) return <h2>Loading...</h2>;

  return (
    <SpotWrapper>
      <SpotName>{spot.spotName}</SpotName>
      <SpotDetails>
        <h2>SPOT INFORMATION</h2>
        <Longitude>Longitude: {spot.longitude}</Longitude>
        <Latitude>Latitude: {spot.latitude}</Latitude>
      </SpotDetails>
    </SpotWrapper>
  );
}
