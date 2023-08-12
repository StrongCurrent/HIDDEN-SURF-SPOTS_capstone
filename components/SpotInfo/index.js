import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import MarkerMap from "../MarkerMap";
import {
  SpotNameInput,
  SpotNameEditButton,
  SpotNameChangedSuccess,
  SpotNameError,
  SpotWrapper,
  SpotName,
  InformationWrapper,
  EntryList,
  EntryListItem,
  EditIcon,
  NoEntryMessage,
  SpotDeleteButton,
  ModalHeadline,
  ModalMessage,
  ModalDeleteButton,
  ModalKeepButton,
} from "./style";
import Error from "../Error";
import { CiEdit, CiCircleCheck } from "react-icons/ci";
import EditDeleteInfoForm from "../EditDeleteInfoForm";
import NewInfoForm from "../NewInfoForm";
import Modal from "../Modal";

export default function SpotInfo({ spotId }) {
  const { data: spot, error, mutate } = useSWR(`/api/spots/${spotId}`);
  const router = useRouter();
  const [isEditingSpotName, setIsEditingSpotName] = useState(false);
  const [spotNameError, setSpotNameError] = useState("");
  const [newSpotName, setNewSpotName] = useState("");
  const [spotNameChangeSuccess, setSpotNameChangeSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpotNameChange = (event) => {
    setNewSpotName(event.target.value);
  };

  const handleEditSpotName = async () => {
    if (isEditingSpotName) {
      if (!newSpotName.trim()) {
        setSpotNameError("YOU FORGOT TO ENTER THE SPOT NAME");
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
        if (
          data.message.toUpperCase() ===
          "PLEASE CHOOSE ANOTHER NAME, THIS ONE IS ALREADY TAKEN."
        ) {
          setSpotNameError(data.message);
        } else {
          setSpotNameError("FAILED TO UPDATE SPOT NAME");
        }
      }
    } else {
      setIsEditingSpotName(true);
      setNewSpotName(spot.spotName);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteSpot = async () => {
    const response = await fetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    }
  };

  if (!spot) {
    return;
  }

  if (error) {
    console.error("SWR Error:", error);
    if (error.status === 401) {
      return <Error role="alert">PLEASE LOGIN TO ACCESS YOUR DATA</Error>;
    } else if (error.message === "SPOT NOT FOUND") {
      return <Error role="alert">SPOT NOT FOUND</Error>;
    }
    return <Error role="alert">FAILED TO LOAD SPOT INFORMATION</Error>;
  }

  return (
    <SpotWrapper>
      <MarkerMap
        marker={{ latitude: spot.latitude, longitude: spot.longitude }}
        draggable={false}
        viewMode="info"
      />
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
          <EditIcon
            as={isEditingSpotName ? CiCircleCheck : CiEdit}
            size={25}
            aria-hidden="true"
          />
        </SpotNameEditButton>
      </SpotName>
      <SpotNameError role="alert">{spotNameError}</SpotNameError>
      {spotNameChangeSuccess && (
        <SpotNameChangedSuccess>SPOT NAME CHANGED</SpotNameChangedSuccess>
      )}
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
        <NewInfoForm spotId={spotId} />
      </InformationWrapper>
      <SpotDeleteButton
        onClick={openModal}
        aria-label="Open delete confirmation"
      >
        Delete this Spot
      </SpotDeleteButton>
      {isModalOpen && (
        <Modal onClose={closeModal} aria-label="Confirmation modal">
          <ModalHeadline>WARNING</ModalHeadline>
          <ModalMessage>
            Sure you want to delete this Spot with all the informations?
          </ModalMessage>
          <ModalDeleteButton
            onClick={handleDeleteSpot}
            aria-label="Confirm deletion"
          >
            Delete
          </ModalDeleteButton>
          <ModalKeepButton onClick={closeModal} aria-label="Cancel deletion">
            Cancel
          </ModalKeepButton>
        </Modal>
      )}
    </SpotWrapper>
  );
}
