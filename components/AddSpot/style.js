
import styled from "styled-components";

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

  &::placeholder {
    color: #2f6673;
    opacity: 1;
  }

  &:focus::placeholder {
    color: transparent;
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
  font-size: 1rem;
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

export {AddSpotForm, SpotName, FormContainer, InputLabelWrapper, AddSpotLabel , AddSpotInput, SubmitButton, Error};