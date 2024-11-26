import { useState } from "react";
import "./App.css";

function App() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [dados, setDados] = useState(null); // Estado para armazenar o objeto com login e senha

  const salvar = async (event) => {
    event.preventDefault();
    const usuario = { login, senha };

    try {
      const response = await fetch("http://localhost:3001/api/salvar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert("Erro: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao enviar os dados.");
    }
  };

  return (
    <>
      <form onSubmit={salvar}>
        <input
          type="text"
          placeholder="Login"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">ENVIAR</button>
      </form>

      {/* Exibe os dados do objeto após o envio */}
      {dados && (
        <div>
          <h3>Dados do Usuário:</h3>
          <p>Login: {dados.login}</p>
          <p>Senha: {dados.senha}</p>
        </div>
      )}
    </>
  );
}

export default App;
