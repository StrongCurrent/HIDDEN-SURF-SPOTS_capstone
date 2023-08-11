import styled from "styled-components";

export const AddSpotForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const SpotName = styled.input`
  width: 100%;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  list-style: none;
  padding: 15px 0px 15px 0px;
  background-color: #fcfcfc;
  border-bottom: solid 1px #d5d5d5;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;

  &:focus {
    outline: none;
    background-color: #ffffff;
  }

  &::placeholder {
    color: #ff0000;
    opacity: 0.8;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

export const FormContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const AddSpotLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: #2f6673;
  list-style-type: none;
  margin-right: 10px;
`;

export const AddSpotInput = styled.input`
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

export const SpotCreateButton = styled.button`
  background-color: #2f9e44;
  text-transform: uppercase;
  text-shadow: 0px 1px 3px #474747;
  letter-spacing: 1px;
  font-weight: 600;
  color: #ffffff;
  margin-top: 25px;
  height: 50px;
  width: 180px;
  border-radius: 5px;
  border: none;

  &:hover {
    background-color: #40c057;
  }

  &:focus {
    background-color: #40c057;
    font-weight: 200;
  }
`;

export const SpotAdded = styled.p`
  margin-top: 5px;
  font-size: 1rem;
  color: #40c057;
  z-index: 100;
`;
