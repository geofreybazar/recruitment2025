import { z } from "zod";

export const RecruitSchema = z.object({
  applicantId: z.string().min(1, "Recruit Id  is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().min(1, "Middle name is required"),
  email: z.string().email("Invalid email address"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female"]),
  address: z.string().min(5, "Address is required"),
  course: z.string().min(2, "Course is required"),
  eligibility: z.string().min(2, "Eligibility is required"),
  image: z.string().min(2, "Image is required"),
  phoneNumber: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Phone number must be a valid PH mobile number starting with 09"
    ),
});

export type RecruitType = z.infer<typeof RecruitSchema>;
