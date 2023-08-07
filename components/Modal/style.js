import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 300px;
  height: 200px;
`;

export const StyledModal = styled.div`
  background: #ffffff;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  border: solid 5px #ff3232;
  padding: 15px;
  text-align: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalBody = styled.div`
  padding-top: 10px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
`;

export const CloseModal = styled.button`
  font-weight: 600;
  text-transform: uppercase;
  background-color: #fcfcfc;
  border: solid 1px #d5d5d5;
  border-radius: 5px;
  height: 25px;
  width: 25px;

  &:hover {
    background-color: #f7f7f7;
  }
`;
