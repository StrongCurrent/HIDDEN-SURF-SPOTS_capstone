import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  AddSpotForm,
  AddSpotInput,
  AddSpotLabel,
  FormContainer,
  InputLabelWrapper,
  SpotName,
  SpotCreateButton,
  SpotAdded,
} from "./style";
import ErrorMessage from "../Error";
import LoadingSpinner from "../LoadingSpinner";

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
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "spotName") {
      setSpotName(value);
    } else if (name === "longitude") {
      setLongitude(value);
    } else if (name === "latitude") {
      setLatitude(value);
    }
  };

  const isValidInput = () => {
    return !(
      spotName.trim() === "" ||
      spotName === "NAME THIS SPOT HERE" ||
      longitude.trim() === "" ||
      latitude.trim() === ""
    );
  };

  const handleAddSpot = async (event) => {
    event.preventDefault();
    if (!isValidInput()) {
      setError("PLEASE FILL ALL FIELDS");
      return;
    }

    setIsLoading(true);

    try {
      await createSpot(spotName.toLowerCase(), longitude, latitude);
      setSpotName("");
      setLongitude("");
      setLatitude("");
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
      <FormContainer>
        <InputLabelWrapper>
          <AddSpotLabel type="text" htmlFor="longitude">
            Longitude:{" "}
          </AddSpotLabel>
          <AddSpotInput
            type="number"
            pattern="-?\d+(\.\d+)?"
            value={longitude}
            onChange={handleChange}
            required
            id="longitude"
            name="longitude"
            aria-label="Longitude Input"
          />
        </InputLabelWrapper>
        <InputLabelWrapper>
          <AddSpotLabel type="text" htmlFor="latitude">
            Latitude:{" "}
          </AddSpotLabel>
          <AddSpotInput
            type="number"
            pattern="-?\d+(\.\d+)?"
            value={latitude}
            onChange={handleChange}
            required
            id="latitude"
            name="latitude"
            aria-label="Latitude Input"
          />
        </InputLabelWrapper>
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
      </FormContainer>
    </AddSpotForm>
  );
}
