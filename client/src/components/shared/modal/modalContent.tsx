import React, { MouseEvent } from "react";
import { ModalProps } from ".";

const ModalContent: React.FC<ModalProps> = ({
  isShown,
  toggleModal,
  children,
}) => {
  if (!isShown) return null;
  const handleClickParent = (e: MouseEvent) => {
    e.stopPropagation();
    toggleModal();
  };

  const handleClickChild = (e: MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`
      ${"flex absolute left-0 top-0 w-screen h-screen overflow-hidden"}
      ${"bg-gray-deepestDark-transparent justify-center items-center"}`}
      onClick={handleClickParent}
    >
      <div
        className={`
        ${"flex flex-col bg-white max-w-xl"} 
        ${"ring-2 ring-gray-dark rounded-lg"}
}`}
        onClick={handleClickChild}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalContent;
