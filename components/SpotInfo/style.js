import styled from "styled-components";

export const SpotNameInput = styled.input`
  border: 1px dotted #5d9ea6;
  border-radius: 5px;
  padding: 5px;
  width: 25%;

  &:focus {
    background-color: #ffffff;
    outline: solid 1px #5d9ea6;
    border: none;
  }
`;

export const SpotNameEditButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0px 0px 0px 0px;
`;

export const SpotNameError = styled.div`
  text-align: center;
  color: #ff3232;
  font-size: 0.9rem;
  margin: 5px 0px 0px 0px;
`;

export const SpotWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

export const SpotName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  list-style: none;
  padding: 0px 0px 0px 25px;
  background-color: #fcfcfc;
  border-bottom: solid 1px #d5d5d5;
  border-top: solid 5px #2f6673;
  border-left: 0px;
  border-right: 0px;
`;

export const InformationWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export const Longitude = styled.p`
  font-size: 1rem;
  color: #2f6673;
  margin: 0px 0px 10px 0px;
`;

export const Latitude = styled.p`
  font-size: 1rem;
  color: #2f6673;
  margin: 0px 0px 10px 0px;
`;

export const NoEntryMessage = styled.div`
  text-transform: uppercase;
  font-size: 1rem;
  color: #ff0000;
  margin-top: 5px;
`;

export const EntryList = styled.ul`
  padding: 0;
  margin: 0;
  align-items: left;
`;

export const EntryCard = styled.li`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  justify-content: space-between;
`;

export const EntryContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ButtonAndErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const EntryTextarea = styled(({ isEditing, ...props }) =>
  isEditing ? <textarea {...props} /> : <p {...props} />
)`
  flex: 1;
  list-style: none;
  font-family: Roboto;
  padding: 10px;
  height: auto;
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
  max-width: 90%;
  max-height: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;

  ${({ isEditing }) =>
    isEditing
      ? `
    border: dotted 1.5px #5d9ea6;
    
      `
      : `
    background-color: #fcfcfc;
    border: solid 1px #d5d5d5;
      `}
  &:focus {
    background-color: #ffffff;
    outline: solid 1px #5d9ea6;
    border: none;
  }
`;

export const EditIcon = styled.svg`
  fill: #5d9ea6;
`;

export const TrashIcon = styled.svg`
  fill: #ff3232;
`;

export const EdTrButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const EntryEditErrorText = styled.p`
  color: #ff3232;
  font-size: 0.9rem;
  margin: 0px 0px 2px 0px;
`;

export const EntryEditButton = styled.button`
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  margin: 0px 0px 5px 10px;
  height: 40px;
  width: 40px;
`;

export const EntryDeleteButton = styled.button`
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  margin: 0px 0px 5px 10px;
  height: 40px;
  width: 40px;
`;

export const AddEntryForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export const AddEntryLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  margin: 40px 0px 20px 0px;
`;

export const AddEntryTextarea = styled.textarea`
  font-family: Roboto;
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
    outline: solid 1px #5d9ea6;
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
  background-color: #fcfcfc;
  border: solid 1px #d5d5d5;
  border-radius: 5px;
  margin: 15px 0px 15px 0px;
  height: 23px;
  width: 125px;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const SpotDeleteButton = styled.button`
  background-color: #ff5050;
  text-transform: uppercase;
  color: #ffffff;
  margin-top: 15px;
  height: 30px;
  width: 250px;
  border-radius: 5px;
  border: none;

  &:hover {
    background-color: #ff3232;
  }

  &:focus {
    background-color: #ff3232;
    font-weight: 600;
  }
`;
