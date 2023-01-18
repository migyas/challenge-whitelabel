import { NavLink } from "react-router-dom";
import genericLogo from "../../assets/logo-generic.svg";
import { FormContainer, SignContainer } from "./styles";

export default function SignIn() {
  return (
    <SignContainer>
      <header>
        <img src={genericLogo} alt="Logomarca da empresa" />
        <strong>Olá, seja bem vindo ao </strong>
        <span>SisLoterica</span>
      </header>
      <FormContainer>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Digite seu e-mail" />
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
      </FormContainer>
      <footer>
        <span>
          Ainda não possui uma conta?{" "}
          <NavLink to="/signup">Registre-se</NavLink>
        </span>
      </footer>
    </SignContainer>
  );
}
