import React from "react";
import ReactDOM from "react-dom";
import {
  ModalWrapper,
  StyledModal,
  ModalOverlay,
  ModalBody,
} from "./style";

const Modal = ({ onClose, children }) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <ModalOverlay>
      <ModalWrapper>
        <StyledModal>
          <ModalBody>{children}</ModalBody>
        </StyledModal>
      </ModalWrapper>
    </ModalOverlay>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
