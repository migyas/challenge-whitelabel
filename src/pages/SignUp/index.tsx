import { useForm, Controller } from "react-hook-form";
import { NavLink } from "react-router-dom";
import * as zod from "zod";
import genericLogo from "../../assets/logo-generic.svg";
import { Select } from "../../components/Select";
import { optionsBackgroundColor } from "../../utils/mocks/optionsBackgroundColor";
import { optionsLevel } from "../../utils/mocks/optionsLevel";
import { FormContainer, SignContainer } from "./styles";

const defaultOption = {
  value: "",
  label: "Selecione a opção",
};

const newUserFormValidationSchema = zod.object({
  nivel: zod.object({
    value: zod.string(),
    label: zod.string(),
  }),
  nome: zod.string(),
  telefone: zod.string(),
  corDeFundo: zod.object({
    value: zod.string(),
    label: zod.string(),
  }),
  email: zod.string(),
  senha: zod.string(),
});

type NewUserFormData = zod.infer<typeof newUserFormValidationSchema>;

export default function SignUp() {
  const { register, handleSubmit, control, reset } = useForm<NewUserFormData>({
    defaultValues: {
      nome: "",
      telefone: "",
      email: "",
      senha: "",
      corDeFundo: defaultOption,
      nivel: defaultOption,
    },
  });

  async function onSubmit(data: NewUserFormData) {
    console.log(data);
    reset();
  }

  return (
    <SignContainer>
      <header>
        <img src={genericLogo} alt="Logomarca da empresa" />
        <strong>Criar uma conta no</strong>
        <span>SisLoterica</span>
      </header>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nome</label>
        <input {...register("nome")} id="name" placeholder="Nome" />
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="E-mail"
        />
        <label htmlFor="telephone">Telefone</label>
        <input
          {...register("telefone")}
          id="telephone"
          placeholder="Telefone"
        />
        <Controller
          name="nivel"
          control={control}
          render={({ field }) => (
            <Select {...field} options={optionsLevel} labelText="Nível" />
          )}
        />
        <Controller
          name="corDeFundo"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={optionsBackgroundColor}
              labelText="Cor de fundo"
            />
          )}
        />
        <label htmlFor="password">Senha</label>
        <input
          {...register("senha")}
          id="password"
          type="password"
          placeholder="Senha"
        />
        <button type="submit">Registrar</button>
      </FormContainer>
      <footer>
        <span>
          Você já possui conta? <NavLink to="/signin">Entrar</NavLink>
        </span>
      </footer>
    </SignContainer>
  );
}
