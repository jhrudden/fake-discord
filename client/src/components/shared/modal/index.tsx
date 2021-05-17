import React from "react";
import ReactDOM from "react-dom";
import { usePortal } from "../../hooks/usePortal";
import ModalContent from "./modalContent";

export type ModalProps = {
  isShown: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = (props) => {
  const target = usePortal("modal-root");

  return ReactDOM.createPortal(<ModalContent {...props} />, target);
};

export default Modal;
