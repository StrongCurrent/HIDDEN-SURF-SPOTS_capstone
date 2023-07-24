import {
  SpotWrapper,
  SpotName,
  SpotDetails,
  Longitude,
  Latitude,
} from "./style";

export default function SpotInfo({ spot }) {
  return (
    <SpotWrapper>
      <SpotName>{spot.name}</SpotName>
      <SpotDetails>
        <h2>SPOT INFORMATION</h2>
        <Longitude>Longitude: {spot.longitude}</Longitude>
        <Latitude>Latitude: {spot.latitude}</Latitude>
      </SpotDetails>
    </SpotWrapper>
  );
}
