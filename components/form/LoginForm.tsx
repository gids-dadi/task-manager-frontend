"use client";
import React from "react";
import CustomInputField from "../custom/CustomInputField";
import { useState } from "react";
import Link from "next/link";
import CustomButton from "../custom/CustomButton";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { UserLoginValidator } from "../../lib/validator";
import { login } from "../../app/api/auth.service";

const LoginForm = () => {
  const router = useRouter();
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleSubmit = async () => {
    if (!isDirty) return;
    try {
      UserLoginValidator.parse({ ...formValues, username: formValues.email });
      await login({
        email: formValues.email,
        password: formValues.password,
      }).then((response) => {
        if (response.status === 200) {
          router.push("");
        }
      });
      setFormValues({
        email: "",
        password: "",
      });

      setIsDirty(false);
      setErrors({});
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
    <div className="flex size-full flex-col items-start justify-start p-4">
      <div className="flex size-full flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-col items-center justify-center gap-4 px-2 text-center">
          <h2 className="font-poppinsBold text-xl font-bold text-brandBlue md:text-2xl lg:text-3xl">
            Login
          </h2>
          <p className="text-sm text-gray-600 md:text-base lg:text-lg">
            Login to your account
          </p>
        </div>

        <div className="flex w-full flex-col">
          <CustomInputField
            label="Email"
            name="email"
            value={formValues.email}
            type="email"
            placeholder="Enter your email"
            handleChangeText={handleInputChange}
            otherStyles="h-12"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        <div className="flex w-full flex-col">
          <CustomInputField
            label="Password"
            name="password"
            value={formValues.password}
            type="password"
            placeholder="Enter your password"
            handleChangeText={handleInputChange}
            otherStyles="h-12"
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>

        <div className="flex w-full items-center justify-center gap-3">
          <p className="text-sm">Don&apos;t have an account?</p>
          <Link href="/register" className="text-brandBlue">
            Register
          </Link>
        </div>

        {/* <form> */}
        <div className="mb-4 w-full">
          <CustomButton
            title="Login"
            type="submit"
            textStyles="text-white"
            // isLoading={loginLoading}
            isDirty={isDirty}
            handleClick={handleSubmit}
          />
        </div>

        {/* </form>  */}
      </div>
    </div>
  );
};

export default LoginForm;
