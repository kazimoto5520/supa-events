import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  accountType: z
    .string()
    .min(1, "Account type is mandatory"),
  phoneNumber: z
    .string()
    .length(12, "Phone number must be exactly 12 digits"),
  firstName: z
    .string()
    .min(1, "First name is mandatory"),
  lastName: z
    .string()
    .min(1, "Last name is mandatory"),
    termsAccepted: z
    .boolean()
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
    rememberMe: z
    .boolean().optional(),
});

export { signUpSchema, signInSchema };
