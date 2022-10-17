import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

type LoginProps = {
  children: JSX.Element;
};

const Login = ({ children }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, login } = useAuthContext();

  if (isAuthenticated) {
    return children;
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    await login(email, password).then(() => console.log("ok"));
  }

  return (
    <div>
      <input placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
      <input placeholder="Senha" onChange={(event) => setPassword(event.target.value)} />
      <button onClick={(event) => handleLogin(event)}>Entrar</button>
    </div>
  );
};

export default Login;
