"use client";
import React, { useState } from "react";
import Image from "next/image";
import { icons } from "../../constant";

interface CustomInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  value: string;
  name: string;
  placeholder?: string;
  handleChangeText: React.ChangeEventHandler<HTMLInputElement>;
  otherStyles?: string;
  labelBySide?: boolean;
  icon?: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  type,
  value,
  name,
  placeholder,
  handleChangeText,
  otherStyles = "",
  labelBySide = false,
  icon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  // const isPhoneField = name === "phone";

  return (
    <div
      className={`flex w-full ${
        labelBySide
          ? "flex-col items-start gap-2 md:flex-row md:gap-10"
          : "flex-col gap-2"
      }`}
    >
      <p className="min-w-32 font-poppinsMedium text-[16px] text-gray-900">
        {label}
      </p>
      <div
        className={`${otherStyles} flex w-full items-center rounded-xl outline-none focus:ring-2`}
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#C3C3C3",
          padding: "0.5rem 1rem",
          backgroundColor: "#fff",
        }}
      >
        <div className="flex w-full flex-row items-center">
          {icon && (
            <Image
              src={icon}
              alt="Input Field Icon"
              width={22}
              height={22}
              className="mr-2"
            />
          )}

          <input
            className="w-full p-2 font-poppinsMedium text-sm font-thin leading-3 text-gray-900 focus:outline-none"
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={handleChangeText}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            {...props}
          />

          {/* Show/Hide Password Button */}
          {type === "password" && (
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              <Image
                src={!showPassword ? icons.eyeIcon : icons.eyeSlashIcon}
                alt="Toggle Password Visibility"
                width={25}
                height={25}
                className="size-5"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomInputField;
