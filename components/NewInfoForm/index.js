import React, { useState } from "react";
import { useSWRConfig } from "swr";
import {
  AddEntryForm,
  AddEntryLabel,
  AddEntryTextarea,
  AddEntryButtonWrapper,
  AddEntryButton,
  EntryEditErrorText,
} from "./style";

const useAddNewEntry = (spotId) => {
  const { mutate } = useSWRConfig();
  const [newInfo, setNewInfo] = useState("");
  const [entryError, setEntryError] = useState("");

  const handleNewEntryChange = (event) => {
    setNewInfo(event.target.value);
  };

  const validateNewEntry = () => {
    if (!newInfo.trim()) {
      return "YOU FORGOT TO ENTER THE INFORMATION";
    }
    return null;
  };

  const handleAddNewEntry = async (event) => {
    event.preventDefault();
    const error = validateNewEntry();
    if (error) {
      setEntryError(error);
      return;
    }

    const response = await fetch(`/api/spots/${spotId}/informations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info: newInfo }),
    });

    if (response.ok) {
      setNewInfo("");
      mutate(`/api/spots/${spotId}`);
      setEntryError("");
    } else if (response.status === 401) {
      setEntryError("PLEASE LOGIN TO ACCESS YOUR DATA");
    } else {
      setEntryError("AN UNKNOWN ERROR OCCURRED");
    }
  };

  return {
    newInfo,
    entryError,
    handleNewEntryChange,
    handleAddNewEntry,
  };
};

export default function AddNewInfoForm({ spotId }) {
  const { newInfo, entryError, handleNewEntryChange, handleAddNewEntry } =
    useAddNewEntry(spotId);

  return (
    <AddEntryForm
      onSubmit={handleAddNewEntry}
      aria-label="Form to add a new entry"
    >
      <AddEntryLabel htmlFor="new-info">Enter a new Information</AddEntryLabel>
      <EntryEditErrorText role="alert" aria-live="polite">
        {entryError}
      </EntryEditErrorText>
      <AddEntryTextarea
        id="new-info"
        name="new-info"
        maxLength="450"
        value={newInfo}
        onChange={handleNewEntryChange}
        aria-label="Add new entry input"
      />
      <AddEntryButtonWrapper>
        <AddEntryButton
          type="submit"
          name="create-info"
          aria-label="Create entry"
        >
          ADD NEW ENTRY
        </AddEntryButton>
      </AddEntryButtonWrapper>
    </AddEntryForm>
  );
}
