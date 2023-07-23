import styled from "styled-components";
import React, { useState } from "react";
import { useRouter } from "next/router";
import mockData, { addSpotData } from "../../lib/mock-data";

export default function NewSpotForm() {
  const [spotName, setSpotName] = useState("NAME THIS SPOT HERE");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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

  const handleFocusSpotName = () => {
    setIsFocused(true);
    if (spotName === "NAME THIS SPOT HERE") {
      setSpotName("");
    }
  };

  const handleBlurSpotName = () => {
    setIsFocused(false);
    if (spotName.trim() === "") {
      setSpotName("NAME THIS SPOT HERE");
    }
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
        placeholder={
          isFocused || spotName !== "NAME THIS SPOT HERE"
            ? ""
            : "NAME THIS SPOT HERE"
        }
        value={spotName}
        onChange={handleSpotNameChange}
        onFocus={handleFocusSpotName}
        onBlur={handleBlurSpotName}
        required
        aria-label="Spotname Input"
      />
      <FormContainer>
        <InputLabelWrapper>
          <AddSpotLabel type="text" htmlFor="longitude">
            Longitude:{" "}
          </AddSpotLabel>
          <AddSpotInput
            type="input"
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
            type="input"
            pattern="-?\d+(\.\d+)?"
            value={latitude}
            onChange={handleLatitudeChange}
            required
            id="latitude"
            name="latidude"
            aria-label="Latidude Input"
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

const AddSpotForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SpotName = styled.input`
  width: 100%;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  list-style: none;
  padding: 5px 0px;
  margin-bottom: 40px;
  background-color: #fcfcfc;
  border-bottom: solid 1px #d5d5d5;
  border-top: solid 5px #2f6673;
  border-left: 0px;
  border-right: 0px;

  &:focus {
    outline: none;
    background-color: #ffffff;
  }
`;

const FormContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const AddSpotLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  color: #2f6673;
  list-style-type: none;
  margin-right: 10px;
`;

const AddSpotInput = styled.input`
  display: block;
  background-color: #fcfcfc;
  border-radius: 5px;
  border: solid 1px #d5d5d5;
  padding: 10px 20px 10px 10px;
  height: 20px;
  width: 150px;

  &:focus {
    outline: none;
    border-color: #d5d5d5;
    background-color: #ffffff;
  }
`;

const SubmitButton = styled.button`
  background-color: #2f9e44;
  text-transform: uppercase;
  color: #ffffff;
  margin-top: 15px;
  height: 30px;
  width: 250px;
  border-radius: 5px;
  border: none;

  &:focus {
    background-color: #40c057;
  }
`;

const Error = styled.div`
  color: #ff0000;
`;
