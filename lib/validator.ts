import { z } from "zod";

export const UserRegistrationValidator = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  referralCode: z.string().optional(),
  termsAndCondition: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const UserLoginValidator = z.object({
  username: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const AddTaskValidator = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Invalid priority level" }),
  }),
  dueDate: z.string().optional(),
});
