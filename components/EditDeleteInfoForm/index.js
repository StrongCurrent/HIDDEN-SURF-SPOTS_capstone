import React, { useState, useEffect, useCallback } from "react";
import { useSWRConfig } from "swr";
import { CiEdit, CiCircleCheck, CiTrash } from "react-icons/ci";
import {
  InfoFormWrapper,
  EntryContentWrapper,
  EntryTextarea,
  EditIcon,
  TrashIcon,
  EdTrButtonWrapper,
  EntryEditButton,
  EntryDeleteButton,
  ButtonAndErrorWrapper,
  EntryEditErrorText,
} from "./style";

const updateInformation = async (spotId, infoId, info) => {
  const response = await fetch(
    `/api/spots/${spotId}/informations/${infoId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};

const deleteInformation = async (spotId, infoId) => {
  const response = await fetch(
    `/api/spots/${spotId}/informations/${infoId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};

export default function EditDeleteInfoForm({ entry, spotId }) {
  const { mutate } = useSWRConfig();
  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState(entry ? entry.info : "");
  const [inputError, setInputError] = useState(null);

  const isValidEntry = useCallback(
    () => entry && entry.info.trim(),
    [entry]
  );

  const [disabled, setDisabled] = useState(!isValidEntry());

  useEffect(() => {
    setEditInfo(entry ? entry.info : "");
    setDisabled(!isValidEntry());
  }, [entry, isValidEntry]);

  const handleEdit = useCallback(async () => {
    if (!isValidEntry() || disabled) {
      return;
    }

    if (isEditing) {
      try {
        await updateInformation(spotId, entry._id, editInfo);
        setIsEditing(false);
        setInputError(null);
        mutate(`/api/spots/${spotId}`);
      } catch (error) {
        setInputError(error.message);
      }
    } else {
      setIsEditing(true);
      setEditInfo(entry.info);
    }
  }, [entry, isEditing, editInfo, spotId, mutate, disabled, isValidEntry]);

  const handleDelete = useCallback(async () => {
    if (!isValidEntry() || disabled) {
      return;
    }

    try {
      await deleteInformation(spotId, entry._id);
      mutate(`/api/spots/${spotId}`);
    } catch (error) {
      setInputError(error.message);
    }
  }, [entry, spotId, mutate, disabled, isValidEntry]);

  return (
    <InfoFormWrapper>
      {entry && (
        <>
          {inputError && isEditing && (
            <ButtonAndErrorWrapper>
              <EntryEditErrorText aria-live="polite">
                {inputError}
              </EntryEditErrorText>
            </ButtonAndErrorWrapper>
          )}
          <EntryContentWrapper>
            <EntryTextarea
              id="editInfo"
              name="editInfo"
              isEditing={isEditing}
              value={isEditing ? editInfo : undefined}
              onChange={
                isEditing ? (e) => setEditInfo(e.target.value) : undefined
              }
              disabled={disabled}
            >
              {entry.info}
            </EntryTextarea>
            <EdTrButtonWrapper>
              <EntryEditButton
                onClick={handleEdit}
                aria-label={`Edit entry for ${entry.info}`}
                disabled={disabled}
              >
                {isEditing ? (
                  <EditIcon as={CiCircleCheck} size={25} />
                ) : (
                  <EditIcon as={CiEdit} size={25} />
                )}
              </EntryEditButton>
              <EntryDeleteButton
                onClick={handleDelete}
                aria-label={`Delete entry for ${entry.info}`}
                disabled={disabled}
              >
                <TrashIcon as={CiTrash} size={25} />
              </EntryDeleteButton>
            </EdTrButtonWrapper>
          </EntryContentWrapper>
        </>
      )}
    </InfoFormWrapper>
  );
}