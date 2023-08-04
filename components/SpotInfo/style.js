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

export const NoEntryMessage = styled.p`
  text-transform: uppercase;
  font-size: 1rem;
  color: #ff0000;
  margin-top: 5px;
`;

export const EntryList = styled.ul`
 list-style-type: none;
  padding: 0;
  margin: 0;
  align-items: left;
`;

export const EntryListItem = styled.li`
`;

export const EditIcon = styled.svg`
  fill: #5d9ea6;
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
