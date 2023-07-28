import useSWR from "swr";
import { useRouter } from "next/router";
import {
  SpotWrapper,
  SpotName,
  SpotDetails,
  Longitude,
  Latitude,
  SpotDeleteButton,
} from "./style";

export default function SpotInfo({ spotId }) {
  const { data: spot, error } = useSWR(`/api/spots/${spotId}`);
  const router = useRouter();

  const handleDeleteSpot = async () => {
    const response = await fetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    } else {
      const responseData = await response.json();
      console.error(responseData.message);
    }
  };

  if (error) {
    return (
      <h2>
        {error.message === "Spot not found"
          ? "Spot not found"
          : "Failed to load spot information"}
      </h2>
    );
  }

  if (!spot) {
    return <h2>Loading...</h2>;
  }

  return (
    <SpotWrapper>
      <SpotName>{spot.spotName}</SpotName>
      <SpotDetails>
        <h2>SPOT INFORMATION</h2>
        <Longitude>Longitude: {spot.longitude}</Longitude>
        <Latitude>Latitude: {spot.latitude}</Latitude>
      </SpotDetails>
      <SpotDeleteButton onClick={handleDeleteSpot}>Delete this Spot</SpotDeleteButton>
    </SpotWrapper>
  );
}