import React, { useState } from "react";
import { useRouter } from "next/router";
import { AddSpotForm, SpotName, SpotCreateButton, SpotAdded } from "./style";
import ErrorMessage from "../Error";
import LoadingSpinner from "../LoadingSpinner";
import MarkerMap from "../MarkerMap";
import { useSession } from "next-auth/react";

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
    const error = new Error(
      responseData.message || "Unexpected error occurred"
    );
    error.status = response.status;
    throw error;
  }
};

export default function CreateSpot() {
  const { data: session, status } = useSession();
  const [spotName, setSpotName] = useState("");
  const [marker, setMarker] = useState({
    latitude: -28.6477,
    longitude: 153.6345,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (status === "loading") {
    return <LoadingSpinner role="status" />;
  }

  if (status === "unauthenticated") {
    return <ErrorMessage>PLEASE LOGIN TO CREATE A SPOT</ErrorMessage>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "spotName") {
      setSpotName(value);
      setError("");
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
        latitude: -28.6477,
        longitude: 153.6345,
      });
      router.push("/");
    } catch (error) {
      setError(
        error.status === 401 ? "PLEASE LOGIN TO CREATE A SPOT"
        : (error.message && typeof error.message === "string") ? error.message.toUpperCase()
        : "UNKNOWN ERROR OCCURRED"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AddSpotForm onSubmit={handleAddSpot}>
      <MarkerMap
        marker={marker}
        setMarker={setMarker}
        draggable={true}
        viewMode="create"
      />
      <SpotName
        id="spotName"
        name="spotName"
        type="input"
        placeholder="NAME THIS SPOT HERE"
        value={spotName}
        onChange={handleChange}
        required
        aria-label="Spot name Input"
      />
      <SpotCreateButton
        type="submit"
        name="create-spot"
        aria-label="Create spot"
      >
        CREATE THIS SPOT
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
