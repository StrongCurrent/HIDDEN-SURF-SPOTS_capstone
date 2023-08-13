import styled from "styled-components";

export const InfoFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  font-family: 'Roboto Flex', Arial, sans-serif;
  -webkit-appearance: none;
  padding: 10px;
  height: auto;
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 0px 0px 10px 0px;
  max-width: 90%;
  max-height: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;

  ${({ isEditing }) =>
    isEditing
      ? `
    border: dotted 1.5px var(--theme-secondary-light);
    
      `
      : `
    background-color: #fcfcfc;
    border: solid 1px #d5d5d5;
      `}
  &:focus {
    background-color: #ffffff;
    outline: solid 1px var(--theme-secondary-light);
    border: none;
  }
`;

export const EditIcon = styled.svg`
  fill: var(--theme-secondary-light);
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

  &:disabled {
    color: #cccccc; 
    cursor: not-allowed;
  }
`;

export const EntryDeleteButton = styled.button`
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  margin: 0px 0px 5px 10px;
  height: 40px;
  width: 40px;

  &:disabled {
    color: #cccccc; 
    cursor: not-allowed;
  }
`;

export const ModalHeadline = styled.h2`
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ff0000;
  margin: 0px 0px 10px 0px;
`;

export const ModalMessage = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  margin-top: 0px;
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
    font-weight: 200;
  }
`;

export const ModalDeleteButton = styled(BaseModalButton)`
  background-color: #ff5050;

  &:hover, &:focus {
    background-color: #ff3232;
  }
`;

export const ModalKeepButton = styled(BaseModalButton)`
  background-color: #2f9e44;
  margin: 0px 0px 0px 10px;

  &:hover, &:focus {
    background-color: #40c057;
  }
`;