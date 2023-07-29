import React, { useState } from "react";
import { useRouter } from "next/router";
import { AddSpotForm, AddSpotInput, AddSpotLabel, FormContainer, InputLabelWrapper, SpotName, SpotCreateButton, Error } from "./style";

export default function NewSpotForm() {
  const [spotName, setSpotName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState(null);

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

  const handleAddSpot = async (event) => {
    event.preventDefault();
    if (spotName.trim() === "" || spotName === "NAME THIS SPOT HERE" || longitude.trim() === "" || latitude.trim() === "") {
      setError('Please fill all fields.');
      return;
    }

    const response = await fetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ spotName, longitude, latitude })
    });

    if (response.ok) {
      setSpotName("");
      setLongitude("");
      setLatitude("");
      setError(null);
      router.push("/");
    } else {
      const responseData = await response.json();
      setError(responseData.message);
    }
  };

  return (
    <AddSpotForm onSubmit={handleAddSpot}>
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
        <SpotCreateButton
          type="submit"
          name="create-spot"
          aria-label="Create this spot button"
        >
          create this spot
        </SpotCreateButton>
        {error && <Error>{error}</Error>}
      </FormContainer>
    </AddSpotForm>
  );
}
