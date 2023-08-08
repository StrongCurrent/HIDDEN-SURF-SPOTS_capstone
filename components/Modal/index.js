import { createPortal } from "react-dom";
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

  return createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
