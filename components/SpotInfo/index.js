import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import {
  SpotWrapper,
  SpotName,
  InformationWrapper,
  Longitude,
  Latitude,
  EntryTextarea,
  NoInfoMessage,
  InformationForm,
  EntryList,
  InfoTextarea,
  InfoLabel,
  InfoCreateButtonWrapper,
  InfoCreateButton,
  SpotDeleteButton,
} from "./style";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";

export default function SpotInfo({ spotId }) {
  const {
    data: spot,
    error,
    isValidating,
  } = useSWR(`/api/spots/${spotId}`);
  const [newInfo, setNewInfo] = useState("");

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
      body: JSON.stringify({ info: newInfo }),
    });

    if (response.ok) {
      setNewInfo("");
      mutate(`/api/spots/${spotId}`);
    } else {
      const responseData = await response.json();
      console.error(responseData.message);
    }
  };

  if (isValidating) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Error>
        {error.message === "Spot not found"
          ? "Spot not found"
          : "Failed to load spot information"}
      </Error>
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
        {spot.informations && spot.informations.length > 0 ? (
          <EntryList>
            {spot.informations.map((entry) => (
              <EntryTextarea key={entry._id}> {entry.info}</EntryTextarea>
            ))}
          </EntryList>
        ) : (
          <NoInfoMessage>There is no entry yet</NoInfoMessage>
        )}
      </InformationWrapper>
      <InformationForm onSubmit={handleAddNewInfo}>
        <InfoLabel htmlFor="new-info">ADD SOME SPOT INFORMATION</InfoLabel>
        <InfoTextarea
          id="new-info"
          name="new-info"
          maxLength="450"
          value={newInfo}
          onChange={handleNewInfoChange}
        />
        <InfoCreateButtonWrapper>
          <InfoCreateButton
            type="submit"
            name="create-info"
            aria-label="Create information button"
          >
            add this info
          </InfoCreateButton>
        </InfoCreateButtonWrapper>
      </InformationForm>
      <SpotDeleteButton onClick={handleDeleteSpot}>
        Delete this Spot
      </SpotDeleteButton>
    </SpotWrapper>
  );
}
