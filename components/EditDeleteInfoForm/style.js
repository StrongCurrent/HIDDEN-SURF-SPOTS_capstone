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
  font-family: Roboto;
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
