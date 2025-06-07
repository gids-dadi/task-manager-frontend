"use client";

import React, { ReactNode, MouseEvent } from "react";

interface CustomModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onCloseModal,
  title,
  children,
  footer,
  closeOnBackdropClick = true,
}) => {
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={closeOnBackdropClick ? onCloseModal : undefined}
    >
      <div
        className={`max-w-screen relative inline-block max-h-[90%] w-full max-w-[80%] overflow-y-auto rounded-xl bg-white p-6 shadow-xl md:w-[50%] lg:w-3/5 2xl:w-2/5`}
        onClick={handleContentClick}
      >
        <button
          onClick={onCloseModal}
          className="absolute right-4 top-4 z-50 flex size-8 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-200 active:scale-90"
        >
          ✕
        </button>

        {title && (
          <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>
        )}

        <div className="mb-4">{children}</div>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};

export default CustomModal;
