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

export default function EditDeleteInfoForm({ entry, spotId }) {
  const { mutate } = useSWRConfig();
  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState(entry ? entry.info : "");
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    setEditInfo(entry ? entry.info : "");
  }, [entry]);

  const handleEdit = useCallback(async () => {
    if (!entry) return;

    if (isEditing) {
      if (!editInfo.trim()) {
        setInputError("YOU FORGOT TO ENTER THE INFORMATION");
        return;
      }

      const response = await fetch(
        `/api/spots/${spotId}/informations/${entry._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ info: editInfo }),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        setInputError(null);
        mutate(`/api/spots/${spotId}`);
      } else {
        const errorData = await response.json();
        setInputError(errorData.message);
      }
    } else {
      setIsEditing(true);
      setEditInfo(entry.info);
    }
  }, [entry, isEditing, editInfo, spotId, mutate]);

  const handleDelete = async () => {
    if (!entry) return;

    const response = await fetch(
      `/api/spots/${spotId}/informations/${entry._id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (!data.success) {
        setEditError(data.message);
      }
      mutate(`/api/spots/${spotId}`);
    }
  };

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
            >
              {entry.info}
            </EntryTextarea>
            <EdTrButtonWrapper>
              <EntryEditButton
                onClick={handleEdit}
                aria-label={`Edit entry for ${entry.info}`}
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
