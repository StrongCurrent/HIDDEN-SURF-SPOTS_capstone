import styled from "styled-components";

export const SpotWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

export const SpotName = styled.div`
  width: 100%;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  list-style: none;
  padding: 5px 0px;
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

export const EntryList = styled.ul`
  padding: 0;
  margin: 0;
  align-items: left;
`;

export const EntryTextarea = styled.li`
  list-style: none;
  font-family: Roboto;
  background-color: #fcfcfc;
  border: solid 1px #d5d5d5;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  height: 60px;
  width: 100%;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const InformationForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export const NoInfoMessage = styled.div`
  text-transform: uppercase;
  font-size: 1rem;
  color: #ff0000;
  margin-top: 5px;
`;

export const InfoLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  margin: 40px 0px 10px 0px;
`;

export const InfoTextarea = styled.textarea`
  font-family: Roboto;
  background-color: #fcfcfc;
  border: solid 1px #d5d5d5;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  height: 100%;
  width: 100%;

  &:hover {
    background-color: #f7f7f7;
  }

  &:focus {
    background-color: #ffffff;
    outline: solid 0.5px #d5d5d5;
  }
`;

export const InfoCreateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const InfoCreateButton = styled.button`
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

  &:focus {
    background-color: #f7f7f7;
    font-weight: 600;
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
