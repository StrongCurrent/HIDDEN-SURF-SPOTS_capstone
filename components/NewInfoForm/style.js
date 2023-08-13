import styled from "styled-components";

export const AddEntryForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AddEntryLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  margin: 40px 0px 20px 0px;
`;

export const AddEntryTextarea = styled.textarea`
  font-family: 'Roboto Flex', Arial, sans-serif;
  -webkit-appearance: none;
  background-color: #fcfcfc;
  border: solid 1px #d5d5d5;
  border-radius: 5px;
  padding: 10px;
  height: 100%;
  width: 100%;

  &:hover {
    background-color: #f7f7f7;
  }

  &:focus {
    background-color: #ffffff;
    outline: solid 1px var(--theme-secondary-light);
    border: none;
  }
`;

export const AddEntryButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const AddEntryButton = styled.button`
  text-transform: uppercase;
  background-color: #007f1a;
  text-shadow: 0px 1px 3px #474747;
  letter-spacing: 1px;
  color: #ffffff;
  font-weight: 600;
  height: 35px;
  width: 165px;
  border-radius: 5px;
  border: solid 3px #007f1a;
  margin: 15px 0px 25px 0px;

  &:hover {
    font-weight: 800;
  }
`;

export const EntryEditErrorText = styled.p`
  color: #da2001;
  font-size: 0.9rem;
  margin: 0px 0px 2px 0px;
`;
