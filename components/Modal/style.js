import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 80%;
  min-height: 60%;
  max-height: 90vh;
  max-width: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledModal = styled.div`
  background: #ffffff;
  width: 100%;
  border-radius: 15px;
  border: solid 1px #000000;
  padding: 15px;
  text-align: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcfcfc80;
  z-index: 1000;
`;

export const ModalBody = styled.div``;
