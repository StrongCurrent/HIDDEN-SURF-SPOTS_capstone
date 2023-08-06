import React, { useState, useCallback } from "react";
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
  EntryListItem,
  EditIcon,
  NoEntryMessage,
  SpotDeleteButton,
  SpotNameChangedSuccess,
} from "./style";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";
import { CiEdit, CiCircleCheck } from "react-icons/ci";
import EditDeleteInfoForm from "../EditDeleteInfoForm";
import AddNewInfoForm from "../AddNewInfoForm";

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
  const [spotNameChangeSuccess, setSpotNameChangeSuccess] = useState(false);
  const router = useRouter();

  const handleSpotNameChange = (event) => {
    setNewSpotName(event.target.value);
  };

  const handleEditSpotName = useCallback(async () => {
    if (isEditingSpotName) {
      if (!newSpotName.trim()) {
        setSpotNameError("YOU FORGOT TO ENTER THE SPOTNAME");
        return;
      }

      if (newSpotName === spot.spotName) {
        setIsEditingSpotName(false);
        setSpotNameError("");
        return;
      }

      const response = await fetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ spotName: newSpotName }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEditingSpotName(false);
        mutate();
        setSpotNameError("");
        setSpotNameChangeSuccess(true);
        setTimeout(() => setSpotNameChangeSuccess(false), 3000);
      } else {
        if (data.message.toUpperCase() === "PLEASE CHOOSE ANOTHER NAME, THIS ONE IS ALREADY TAKEN. SPOT HAS NOT BEEN ADDED.") {
          setSpotNameError(data.message);
        } else {
          setSpotNameError("FAILED TO UPDATE SPOT NAME");
        }
      }
    } else {
      setIsEditingSpotName(true);
      setNewSpotName(spot.spotName);
    }
  }, [isEditingSpotName, newSpotName, spotId, mutate, spot]);

  const handleDeleteSpot = useCallback(async () => {
    const response = await fetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }, [spotId, router]);

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
            id="spotName"
            name="spotName"
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
      {spotNameChangeSuccess && (
        <SpotNameChangedSuccess>SPOT NAME CHANGED</SpotNameChangedSuccess>
      )}
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
              <EntryListItem key={entry._id}>
                <EditDeleteInfoForm entry={entry} spotId={spotId} />
              </EntryListItem>
            ))}
          </EntryList>
        ) : (
          <NoEntryMessage>There is no entry yet</NoEntryMessage>
        )}
        <AddNewInfoForm spotId={spotId} />
      </InformationWrapper>
      <SpotDeleteButton onClick={handleDeleteSpot}>
        Delete this Spot
      </SpotDeleteButton>
    </SpotWrapper>
  );
}