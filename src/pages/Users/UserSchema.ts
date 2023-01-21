import * as zod from 'zod';

export const newUserFormValidationSchema = zod.object({
  nivel: zod.object({
    value: zod.string(),
    label: zod.string(),
  }),
  nome: zod.string().min(1, 'Campo obrigatório'),
  telefone: zod.string().min(9, 'Campo obrigatório'),
  corDeFundo: zod.object({
    value: zod.string(),
    label: zod.string(),
  }),
  email: zod.string().min(1, 'Campo obrigatório'),
  senha: zod.string().min(8, 'Mínimo de 8 caracteres'),
});

export type NewUserFormData = zod.infer<typeof newUserFormValidationSchema>;
