import * as zod from 'zod';

export const SignInFormValidationSchema = zod.object({
  email: zod.string().min(1, 'Campo obrigatório'),
  senha: zod.string().min(8, 'Mínimo de 8 caracteres'),
});

export type SignInFormData = zod.infer<typeof SignInFormValidationSchema>;
