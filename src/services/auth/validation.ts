import { z } from "zod";

const signUpSchema = z.object({
    name: z.string().min(1, "Full Name is required"),
    phone_number: z.string().min(10, "Phone Number must be at least 12 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    location: z.string().min(1, "Location is required"),
    email: z.string().email("Invalid email address"),
  });

  const signInSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
  });

export { signUpSchema, signInSchema };