import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
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
  const { data: spot, error } = useSWR(`/api/spots/${spotId}`, fetcher);
  const [NewInfo, setNewInfo] = useState("");

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

  const handleNewInfoChange = (event) => {
    setNewInfo(event.target.value);
  };

  const handleAddNewInfo = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info: NewInfo }),
    });

    if (response.ok) {
      setNewInfo("");
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
        <InfoLabel htmlFor="new-info">ADD SOME SPOT INFORMATION</InfoLabel>
        <InfoTextarea
          id="new-info"
          name="new-info"
          maxLength="450"
          value={NewInfo} 
          onChange={handleNewInfoChange}
        />
        <InfoCreateButtonWrapper>
          <InfoCreateButton
            type="submit"
            name="create-info"
            onClick={handleAddNewInfo}
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
