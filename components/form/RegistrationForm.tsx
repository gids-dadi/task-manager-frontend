"use client";
import React, { useState } from "react";
import CustomInputField from "../custom/CustomInputField";
import Link from "next/link";
import CustomButton from "../custom/CustomButton";
import { z } from "zod";
import { UserRegistrationValidator } from "../../lib/validator";
import CustomCheckboxField from "../custom/CustomCheckboxField";
import { signup } from "../../app/api/auth.service";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter();
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<any>(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAndCondition: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string | null,
    name?: string,
  ) => {
    if (typeof e === "string" || e === null) {
      // For phone input (string value and name provided separately)
      setFormValues((prevValues) => {
        const updatedValues = { ...prevValues, [name!]: e ?? "" };
        setIsDirty(
          Object.values(updatedValues).some(
            (val) => typeof val === "string" && val.trim() !== "",
          ),
        );
        return updatedValues;
      });
    } else {
      // For regular input events
      const { name, value } = e.target;
      setFormValues((prevValues) => {
        const updatedValues = { ...prevValues, [name]: value };
        setIsDirty(
          Object.values(updatedValues).some(
            (val) => typeof val === "string" && val.trim() !== "",
          ),
        );
        return updatedValues;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleSubmit = async () => {
    if (!isDirty) return;
    try {
      UserRegistrationValidator.parse(formValues);
      await signup({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      }).then((data) => {
        console.log("Registration successful:", data);
        router.push("/login");
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          termsAndCondition: false,
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(errorMessages);
      }
    }
  };

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="flex size-full flex-col items-center justify-center gap-4 p-4">
        <div className="flex w-full flex-col items-center justify-center gap-2 px-2 text-center">
          <h2 className="font-poppinsBold text-xl font-bold text-brandBlue md:text-2xl lg:text-3xl">
            Register
          </h2>
          <p className="text-sm text-gray-600 md:text-base lg:text-lg">
            Complete the form below to create an account
          </p>
        </div>

        <div className="flex w-full flex-col">
          <CustomInputField
            label="First Name"
            name="firstName"
            type="text"
            value={formValues.firstName}
            placeholder="Enter your name"
            className="w-full"
            handleChangeText={handleInputChange}
          />
          {errors.firstName && (
            <span className="text-sm text-red-500">{errors.firstName}</span>
          )}
        </div>

        <div className="flex w-full flex-col">
          <CustomInputField
            label="Last Name"
            name="lastName"
            type="text"
            value={formValues.lastName}
            placeholder="Enter your last name"
            className="w-full"
            handleChangeText={handleInputChange}
          />
          {errors.lastName && (
            <span className="text-sm text-red-500">{errors.lastName}</span>
          )}
        </div>

        <div className="flex w-full flex-col">
          <CustomInputField
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            placeholder="Enter your email"
            className="w-full"
            handleChangeText={handleInputChange}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        <div className="flex w-full flex-col">
          <CustomInputField
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            placeholder="Enter your password"
            className="w-full"
            handleChangeText={handleInputChange}
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>

        <div className="flex w-full flex-col">
          <CustomCheckboxField
            name="termsAndCondition"
            checked={formValues.termsAndCondition}
            handleChange={handleCheckboxChange}
            labelBySide
            description={
              <div className="text-xs md:text-sm">
                I agree to the{" "}
                <Link href="#" className="text-[#fc4100]">
                  terms and conditions
                </Link>
              </div>
            }
          />
          {errors.termsAndCondition && (
            <span className="text-sm text-red-500">
              {errors.termsAndCondition}
            </span>
          )}
        </div>

        <p className="pb-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-brandBlue">
            Login
          </Link>
        </p>

        <CustomButton
          title="Register"
          type="submit"
          textStyles="text-white"
          isDirty={isDirty}
          // isLoading={regLoading}
          handleClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RegistrationForm;
