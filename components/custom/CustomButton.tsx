import React from "react";

interface CustomButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  handleClick?: () => void;
  textStyles?: string;
  isLoading?: boolean;
  isDirty?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  type = "button",
  handleClick,
  textStyles = "",
  isLoading = false,
  isDirty = false,
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`my-4 flex min-h-[48px] w-full items-center justify-center rounded-2xl border text-gray-900 ${
        isDirty ? "bg-brandBlue text-white" : "bg-brandGray text-gray-900"
      } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={isLoading}
    >
      <span className={`text-sm font-semibold ${textStyles}`}>{title}</span>

      {isLoading && (
        <div className="ml-2">
          <svg
            className="size-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}
    </button>
  );
};

export default CustomButton;
