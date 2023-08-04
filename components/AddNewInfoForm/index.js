import React, { useState } from "react";
import { useSWRConfig } from "swr";
import {
  AddEntryForm,
  AddEntryLabel,
  AddEntryTextarea,
  AddEntryButtonWrapper,
  AddEntryButton,
  EntryEditErrorText
} from "./style";

export default function AddNewInfoForm({ spotId }) {
  const { mutate } = useSWRConfig();
  const [newInfo, setNewInfo] = useState("");
  const [entryError, setEntryError] = useState("");

  const handleNewEntryChange = (event) => {
    setNewInfo(event.target.value);
  };

  const handleAddNewEntry = async (event) => {
    event.preventDefault();

    if (!newInfo.trim()) {
      setEntryError("YOU FORGOT TO ENTER THE INFORMATION");
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
    }
  };

  return (
    <AddEntryForm
      onSubmit={handleAddNewEntry}
      aria-label="Form to add a new entry"
    >
      <AddEntryLabel htmlFor="new-info">
        ADD SOME SPOT INFORMATION
      </AddEntryLabel>
      <EntryEditErrorText role="alert" aria-live="polite">{entryError}</EntryEditErrorText>
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
          add this entry
        </AddEntryButton>
      </AddEntryButtonWrapper>
    </AddEntryForm>
  );
}