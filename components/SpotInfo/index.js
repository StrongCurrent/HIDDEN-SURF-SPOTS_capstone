import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
  SpotNameInput,
  SpotNameEditButton,
  SpotNameError,
  SpotWrapper,
  SpotName,
  InformationWrapper,
  Longitude,
  Latitude,
  EntryList,
  EditIcon,
  NoEntryMessage,
  SpotDeleteButton,
} from "./style";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";
import { CiEdit, CiCircleCheck } from "react-icons/ci";
import InfoForm from "../InfoForm";
import AddNewInfoForm from "../AddNewInfoForm"

export default function SpotInfo({ spotId }) {
  const {
    data: spot,
    error,
    isValidating,
    mutate,
  } = useSWR(`/api/spots/${spotId}`);
  const [isEditingSpotName, setIsEditingSpotName] = useState(false);
  const [spotNameError, setSpotNameError] = useState("");
  const [newSpotName, setNewSpotName] = useState("");
  const router = useRouter();

  const handleSpotNameChange = (event) => {
    setNewSpotName(event.target.value);
  };

  const handleEditSpotName = async () => {
    if (isEditingSpotName) {
      if (!newSpotName.trim()) {
        setSpotNameError("YOU FORGOT TO ENTER THE SPOTNAME");
        return;
      }

      const response = await fetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ spotName: newSpotName }),
      });

      if (response.ok) {
        setIsEditingSpotName(false);
        mutate();
        setSpotNameError("");
      } else {
        setSpotNameError("Failed to update spot name");
      }
    } else {
      setIsEditingSpotName(true);
      setNewSpotName(spot.spotName);
    }
  };

  const handleDeleteSpot = async () => {
    const response = await fetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  };

  if (isValidating) {
    return <LoadingSpinner role="status" />;
  }

  if (error) {
    return (
      <Error role="alert">
        {error.message === "Spot not found"
          ? "Spot not found"
          : "Failed to load spot information"}
      </Error>
    );
  }

  return (
    <SpotWrapper>
      <SpotName>
        {isEditingSpotName ? (
          <SpotNameInput
            type="text"
            value={newSpotName}
            onChange={handleSpotNameChange}
            aria-label="Spot name input"
          />
        ) : (
          spot.spotName
        )}
        <SpotNameEditButton
          onClick={handleEditSpotName}
          aria-label="Edit spot name"
        >
          {isEditingSpotName ? (
            <EditIcon as={CiCircleCheck} size={25} />
          ) : (
            <EditIcon as={CiEdit} size={25} />
          )}
        </SpotNameEditButton>
      </SpotName>
      <SpotNameError>{spotNameError}</SpotNameError>
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
              <InfoForm key={entry._id} entry={entry} spotId={spotId} />
            ))}
          </EntryList>
        ) : (
          <NoEntryMessage>There is no entry yet</NoEntryMessage>
        )}
        <AddNewInfoForm spotId={spotId}/>
      </InformationWrapper>
      <SpotDeleteButton onClick={handleDeleteSpot}>
        Delete this Spot
      </SpotDeleteButton>
    </SpotWrapper>
  );
}
