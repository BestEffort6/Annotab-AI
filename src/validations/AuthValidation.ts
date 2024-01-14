import { z } from 'zod';

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
);

export const SignUpValidation = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    isAcceptedTermsCond: z.boolean(),
    isAcceptedPrivacy: z.boolean(),
    isAcceptedDataProcAdde: z.boolean(),
    isAcceptedOverEighteen: z.boolean(),
    password: z
      .string()
      .min(8, 'The password must be at least 8 characters long')
      .max(32, 'The password must be a maximun 32 characters')
      .regex(
        passwordRegex,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});
