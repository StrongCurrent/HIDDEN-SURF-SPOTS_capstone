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
  EntryCard,
  EntryContentWrapper,
  EntryTextarea,
  EditIcon,
  TrashIcon,
  EdTrButtonWrapper,
  EntryEditErrorText,
  ButtonAndErrorWrapper,
  EntryEditButton,
  EntryDeleteButton,
  NoEntryMessage,
  AddEntryForm,
  AddEntryLabel,
  AddEntryTextarea,
  AddEntryButtonWrapper,
  AddEntryButton,
  SpotDeleteButton,
} from "./style";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";
import { CiEdit, CiCircleCheck, CiTrash } from "react-icons/ci";

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
  const [newInfo, setNewInfo] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [originalInfo, setOriginalInfo] = useState("");
  const [editInfo, setEditInfo] = useState("");
  const [editError, setEditError] = useState("");
  const [entryError, setEntryError] = useState("");
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

  const handleNewEntryChange = (event) => {
    setNewInfo(event.target.value);
  };

  const handleAddNewEntry = async (event) => {
    event.preventDefault();

    if (!newInfo.trim()) {
      setEntryError("YOU FORGOT TO ENTER THE INFORMATION");
      return;
    }

    const response = await fetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info: newInfo }),
    });

    if (response.ok) {
      setNewInfo("");
      mutate();
      setEntryError("");
    }
  };

  const handleEditChange = (event) => {
    setEditInfo(event.target.value);
  };

  const handleEditEntry = async (infoId) => {
    if (editMode !== null) {
      if (!editInfo.trim()) {
        setEditError("YOU FORGOT TO ENTER THE INFORMATION");
        return;
      }
      if (editInfo === originalInfo) {
        setEditMode(null);
        setOriginalInfo("");
        return;
      }

      const response = await fetch(
        `/api/spots/${spotId}/informations/${infoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ info: editInfo }),
        }
      );

      if (response.ok) {
        setEditInfo("");
        setEditMode(null);
        setOriginalInfo("");
        mutate();
        setEditError("");
      } else {
        const errorData = await response.json();
        setEditError(errorData.message);
      }
    } else {
      setEditMode(infoId);
      const infoToBeEdited = spot.informations.find(
        (info) => info._id === infoId
      );
      setEditInfo(infoToBeEdited.info);
      setOriginalInfo(infoToBeEdited.info);
    }
  };

  const handleDeleteEntry = async (infoId) => {
    const response = await fetch(
      `/api/spots/${spotId}/informations/${infoId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data && data.success) {
        mutate();
      }
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
      <SpotName>
        {isEditingSpotName ? (
          <SpotNameInput
            type="text"
            value={newSpotName}
            onChange={handleSpotNameChange}
          />
        ) : (
          spot.spotName
        )}
        <SpotNameEditButton onClick={handleEditSpotName}>
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
              <EntryCard key={entry._id}>
                <EntryContentWrapper>
                  <EntryTextarea
                    isEditing={editMode === entry._id}
                    value={editMode === entry._id ? editInfo : undefined}
                    onChange={
                      editMode === entry._id ? handleEditChange : undefined
                    }
                  >
                    {entry.info}
                  </EntryTextarea>
                  <EdTrButtonWrapper>
                    <EntryEditButton onClick={() => handleEditEntry(entry._id)}>
                      {editMode === entry._id ? (
                        <EditIcon as={CiCircleCheck} size={25} />
                      ) : (
                        <EditIcon as={CiEdit} size={25} />
                      )}
                    </EntryEditButton>
                    <EntryDeleteButton
                      onClick={() => handleDeleteEntry(entry._id)}
                    >
                      <TrashIcon as={CiTrash} size={25} />
                    </EntryDeleteButton>
                  </EdTrButtonWrapper>
                </EntryContentWrapper>
                {editError && editMode === entry._id && (
                  <ButtonAndErrorWrapper>
                    <EntryEditErrorText>{editError}</EntryEditErrorText>
                  </ButtonAndErrorWrapper>
                )}
              </EntryCard>
            ))}
          </EntryList>
        ) : (
          <NoEntryMessage>There is no entry yet</NoEntryMessage>
        )}
      </InformationWrapper>
      <AddEntryForm onSubmit={handleAddNewEntry}>
        <AddEntryLabel htmlFor="new-info">
          ADD SOME SPOT INFORMATION
        </AddEntryLabel>
        <EntryEditErrorText>{entryError}</EntryEditErrorText>
        <AddEntryTextarea
          id="new-info"
          name="new-info"
          maxLength="450"
          value={newInfo}
          onChange={handleNewEntryChange}
        />
        <AddEntryButtonWrapper>
          <AddEntryButton
            type="submit"
            name="create-info"
            aria-label="Create information button"
          >
            add this entry
          </AddEntryButton>
        </AddEntryButtonWrapper>
      </AddEntryForm>
      <SpotDeleteButton onClick={handleDeleteSpot}>
        Delete this Spot
      </SpotDeleteButton>
    </SpotWrapper>
  );
}
