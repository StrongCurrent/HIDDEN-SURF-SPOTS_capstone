import { useState, useEffect } from "react";
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
  ModalHeadline,
  ModalMessage,
  ModalDeleteButton,
  ModalKeepButton,
} from "./style";
import Modal from "../Modal";

const updateInformation = async (spotId, infoId, info) => {
  const response = await fetch(`/api/spots/${spotId}/informations/${infoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ info }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};

const deleteInformation = async (spotId, infoId) => {
  const response = await fetch(`/api/spots/${spotId}/informations/${infoId}`, {
    method: "DELETE",
  });

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
  const [disabled, setDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isValidEntry = () => entry && entry.info.trim();
    setEditInfo(entry ? entry.info : "");
    setDisabled(!isValidEntry());
  }, [entry]);

  const handleEdit = async () => {
    if (!entry || !entry.info.trim() || disabled) {
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
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = async (shouldDelete) => {
    setIsModalOpen(false);
    if (shouldDelete) {
      try {
        await deleteInformation(spotId, entry._id);
        mutate(`/api/spots/${spotId}`);
      } catch (error) {
        setInputError(error.message);
      }
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
              disabled={disabled}
              aria-label="Edit entry content"
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
                onClick={openModal}
                aria-label={`Delete entry for ${entry.info}`}
                disabled={disabled}
              >
                <TrashIcon as={CiTrash} size={25} />
              </EntryDeleteButton>
            </EdTrButtonWrapper>
          </EntryContentWrapper>
        </>
      )}
      {isModalOpen && (
        <Modal
          onClose={() => closeModal(false)}
          aria-label="Confirmation modal"
        >
          <ModalHeadline>WARNING</ModalHeadline>
          <ModalMessage>Sure you want to delete this information?</ModalMessage>
          <ModalDeleteButton
            onClick={() => closeModal(true)}
            aria-label="Confirm deletion"
          >
            Yes, delete it
          </ModalDeleteButton>
          <ModalKeepButton
            onClick={() => closeModal(false)}
            aria-label="Cancel deletion"
          >
            No, keep it
          </ModalKeepButton>
        </Modal>
      )}
    </InfoFormWrapper>
  );
}