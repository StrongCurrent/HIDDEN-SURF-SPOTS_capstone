import React, { useState } from "react";
import { useRouter } from "next/router";
import mockData, { addSpotData } from "../../lib/mock-data";
import { AddSpotForm, AddSpotInput, AddSpotLabel, FormContainer, InputLabelWrapper, SpotName, SubmitButton, Error } from "./style";


export default function NewSpotForm() {
  const [spotName, setSpotName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [isDuplicateNameError, setIsDuplicateNameError] = useState(false);

  const router = useRouter();

  const handleSpotNameChange = (event) => {
    setSpotName(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (areFieldsValid()) {
      if (isNameDuplicate()) {
        setIsDuplicateNameError(true);
      } else {
        const newSpotData = {
          id: mockData.length + 1,
          name: spotName,
          longitude,
          latitude,
        };
        addSpotData(newSpotData);
        setSpotName("");
        setLongitude("");
        setLatitude("");
        setIsNameError(false);
        setIsDuplicateNameError(false);
        router.push("/");
      }
    } else if (spotName.trim() === "" || spotName === "NAME THIS SPOT HERE") {
      setIsNameError(true);
    }
  };

  const areFieldsValid = () => {
    return (
      spotName.trim() !== "" &&
      spotName !== "NAME THIS SPOT HERE" &&
      longitude.trim() !== "" &&
      latitude.trim() !== ""
    );
  };

  const isNameDuplicate = () => {
    return mockData.some(
      (spot) => spot.name.toLowerCase() === spotName.toLowerCase()
    );
  };

  return (
    <AddSpotForm onSubmit={handleFormSubmit}>
      <SpotName
        id="spotName"
        name="spotName"
        type="input"
        placeholder="NAME THIS SPOT HERE"
        value={spotName}
        onChange={handleSpotNameChange}
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
            onChange={handleLongitudeChange}
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
            onChange={handleLatitudeChange}
            required
            id="latitude"
            name="latitude"
            aria-label="Latitude Input"
          />
        </InputLabelWrapper>
        <SubmitButton
          type="submit"
          name="create-spot"
          aria-label="Create this spot button"
        >
          create this spot
        </SubmitButton>
        {isNameError && <Error>Please enter a spot name.</Error>}
        {isDuplicateNameError && (
          <Error>This spot name is already taken.</Error>
        )}
      </FormContainer>
    </AddSpotForm>
  );
}
