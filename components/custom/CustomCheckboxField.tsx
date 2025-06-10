"use client";
import React from "react";
import Image from "next/image";

interface CustomCheckboxFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelBySide?: boolean;
  icon?: string;
  otherStyles?: string;
  description?: React.ReactNode;
}

const CustomCheckboxField: React.FC<CustomCheckboxFieldProps> = ({
  label,
  name,
  checked,
  handleChange,
  labelBySide = false,
  icon,
  otherStyles = "",
  description = "",
  ...props
}) => {
  return (
    <div
      className={`flex w-full ${
        labelBySide
          ? "flex-col items-start gap-2 md:flex-row md:gap-10"
          : "flex-col gap-2"
      }`}
    >
      <label
        className={`flex cursor-pointer items-center gap-3 ${otherStyles}`}
      >
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          className="h-4 w-4 cursor-pointer accent-[#555]"
          {...props}
        />
        {icon && (
          <Image
            src={icon}
            alt="Checkbox Icon"
            width={22}
            height={22}
            className="inline-block"
          />
        )}
        <span className="font-poppinsRegular text-sm text-gray-800">
          {description}
        </span>
      </label>
    </div>
  );
};

export default CustomCheckboxField;
