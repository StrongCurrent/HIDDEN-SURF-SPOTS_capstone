import useSWR from "swr";
import { useRouter } from "next/router";
import {
  SpotWrapper,
  SpotName,
  InformationWrapper,
  Longitude,
  Latitude,
  SpotDeleteButton,
  InfoLabel,
  InfoTextarea,
  InfoCreateButtonWrapper,
  InfoCreateButton,
} from "./style";
import LoadingSpinner from "../LoadingSpinner";
import { ErrorMessage } from "../Error/style";

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

  if (!spot) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage>
        {error.message === "Spot not found"
          ? "Spot not found"
          : "Failed to load spot information"}
      </ErrorMessage>
    );
  }

  return (
    <SpotWrapper>
      <SpotName>{spot.spotName}</SpotName>
      <InformationWrapper>
        <h2>SPOT INFORMATION</h2>
        <Longitude>Longitude: {spot.longitude}</Longitude>
        <Latitude>Latitude: {spot.latitude}</Latitude>
      </InformationWrapper>
      <InformationWrapper>
        <h2>ADDITIONAL SPOT INFORMATION</h2>
      </InformationWrapper>
      <InformationWrapper>
        <InfoLabel for="info">ADD SOME SPOT INFORMATION</InfoLabel>
        <InfoTextarea id="info" name="info" maxLength="450" />
        <InfoCreateButtonWrapper>
          <InfoCreateButton
            type="submit"
            name="create-info"
            aria-label="Create information button"
          >
            add this info
          </InfoCreateButton>
        </InfoCreateButtonWrapper>
      </InformationWrapper>
      <SpotDeleteButton onClick={handleDeleteSpot}>
        Delete this Spot
      </SpotDeleteButton>
    </SpotWrapper>
  );
}
