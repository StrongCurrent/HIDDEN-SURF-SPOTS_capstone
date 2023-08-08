import React, { useState } from "react";
import { useRouter } from "next/router";
import { AddSpotForm, SpotName, SpotCreateButton, SpotAdded } from "./style";
import ErrorMessage from "../Error";
import LoadingSpinner from "../LoadingSpinner";
import DraggableMarkerMap from "../MapDragableMarker";

const createSpot = async (spotName, longitude, latitude) => {
  const response = await fetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ spotName, longitude, latitude }),
  });

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || "Unexpected error occurred");
  }
};

export default function NewSpotForm() {
  const [spotName, setSpotName] = useState("");
  const [marker, setMarker] = useState({
    latitude: 53.5511,
    longitude: 9.9937,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "spotName") {
      setSpotName(value);
    }
  };

  const isValidInput = () => {
    return !(spotName.trim() === "" || spotName === "NAME THIS SPOT HERE");
  };

  const handleAddSpot = async (event) => {
    event.preventDefault();
    if (!isValidInput()) {
      setError("PLEASE FILL ALL FIELDS");
      return;
    }

    setIsLoading(true);

    try {
      await createSpot(
        spotName.toLowerCase(),
        marker.longitude,
        marker.latitude 
      );
      setSpotName("");
      setMarker({
        latitude: 53.5511,
        longitude: 9.9937,
      });
      router.push("/");
    } catch (error) {
      if (error.message && typeof error.message === "string") {
        setError(error.message);
      } else {
        setError("UNKNOWN ERROR OCCURRED");
      }
    }

    setIsLoading(false);
  };

  return (
    <AddSpotForm onSubmit={handleAddSpot}>
      <SpotName
        id="spotName"
        name="spotName"
        type="input"
        placeholder="NAME THIS SPOT HERE"
        value={spotName}
        onChange={handleChange}
        required
        aria-label="Spotname Input"
      />
      <DraggableMarkerMap marker={marker} setMarker={setMarker} />
      <SpotCreateButton
        type="submit"
        name="create-spot"
        aria-label="Create spot"
      >
        create this spot
      </SpotCreateButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && (
        <>
          <LoadingSpinner />
          <SpotAdded>SPOT WILL BE ADDED</SpotAdded>
        </>
      )}
    </AddSpotForm>
  );
}
