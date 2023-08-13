import styled from "styled-components";

export const SpotNameInput = styled.input`
  border: 1px dotted var(--theme-secondary-light);
  border-radius: 5px;
  padding: 5px;
  width: 25%;

  &:focus {
    background-color: #ffffff;
    outline: solid 1px var(--theme-secondary-light);
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
  color: #da2001;
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
  padding: 10px 0px 10px 25px;
  background-color: #fcfcfc;
  border-bottom: solid 1px #d5d5d5;
  border-top: solid 5px var(--theme-primary-dark);
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
  color: var(--theme-primary-dark);
  margin: 0px 0px 10px 0px;
`;

export const Latitude = styled.p`
  font-size: 1rem;
  color: var(--theme-primary-dark);
  margin: 0px 0px 10px 0px;
`;

export const NoEntryMessage = styled.p`
  text-transform: uppercase;
  font-size: 1rem;
  color: #da2001;
  margin-top: 0px;
`;

export const EntryList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  align-items: left;
`;

export const EntryListItem = styled.li``;

export const EditIcon = styled.svg`
  fill: var(--theme-secondary-light);
`;

export const SpotDeleteButton = styled.button`
  background-color: #da2001;
  text-transform: uppercase;
  text-shadow: 0px 1px 3px #474747;
  letter-spacing: 1px;
  font-weight: 600;
  color: #ffffff;
  margin-top: 15px;
  height: 45px;
  width: 170px;
  border-radius: 5px;
  border: solid 3px #da2001;

  &:hover {
    font-weight: 800;
  }

  &:focus {
    color: #da2001;
    font-weight: 800;
    background-color: #ffffff;
    text-shadow: none;
  }
`;


export const SpotNameChangedSuccess = styled.div`
  margin-top: 5px;
  font-size: 1rem;
  color: #40c057;
  z-index: 100;
`;

export const ModalHeadline = styled.h2`
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 700;
  color: #da2001;
  margin: 0px 0px 10px 0px;
`;

export const ModalMessage = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  margin-top: 0;
`;

export const BaseModalButton = styled.button`
  text-transform: uppercase;
  text-shadow: 0px 1px 3px #474747;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 1px;
  height: 45px;
  width: 100px;
  border-radius: 5px;
  border: none;

  &:focus {
    font-weight: 600;
    text-shadow: none;
  }
`;

export const ModalDeleteButton = styled(BaseModalButton)`
  background-color: #da2001;
  border: solid 3px #da2001;

  &:hover {
    font-weight: 800;
  }

  &:focus {
    color: #da2001;
    font-weight: 800;
    background-color: #ffffff;
  }
`;

export const ModalKeepButton = styled(BaseModalButton)`
  background-color: #008e1d;
  border: solid 3px #008e1d;
  margin: 0px 0px 0px 10px;

  &:hover {
    font-weight: 800;
  }

  &:focus {
    color: #008e1d;
    font-weight: 800;
    background-color: #ffffff;
  }
`;