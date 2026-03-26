import { z } from "zod";

/** Username Validation */
export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must not exceed 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscore allowed");

/** Email Validation */
export const emailValidation = z
  .string()
  .email("Please enter a valid email address");

/** Password Validation */
export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must not exceed 20 characters")
  .regex(/[a-z]/, "Must include lowercase letter")
  .regex(/[A-Z]/, "Must include uppercase letter")
  .regex(/\d/, "Must include a number")
  .regex(/[@$!%*?&]/, "Must include a special character");

/** Signup Schema */
export const signUpValidation = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});