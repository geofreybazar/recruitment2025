import { z } from "zod";

export const userSchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  middlename: z.string().optional(),
  accountNumber: z.string().min(1, "Account number is required"),
  rank: z.string().min(1, "Rank is required"),
  email: z.string().email("Enter a valid email address"),
  phoneNumber: z.string().regex(/^(09\d{9}|(\+639)\d{9})$/, {
    message: "Invalid Philippine mobile number",
  }),
});

export type UserSchema = z.infer<typeof userSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const recruitSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().min(1, "Middle name is required"),
  email: z.string().email("Invalid email address"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female"]),
  address: z.string().min(5, "Address is required"),
  course: z.string().min(2, "Course is required"),
  eligibility: z.string().min(2, "Eligibility is required"),
  phoneNumber: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Phone number must be a valid PH mobile number starting with 09"
    ),
});

export type RecruitType = z.infer<typeof recruitSchema>;
