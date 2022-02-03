import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import UserContext from "../../contexts/UserContext";

import useApi from "../../hooks/useApi";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const history = useHistory();
  const api = useApi();

  const onSubmit = (data) => {
    const { email, password } = data;

    setError(false);
    setLoading(true);

    const body = {
      email,
      password,
    };

    api.user.signIn(body)
      .then((res) => {
        const user = JSON.stringify(res.data);
        localStorage.setItem("user", user);
        setUserInfo(res.data);

        setLoading(false);
        history.push("/conta");
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <LoginContainer loading={loading}>
      <h1>MyWallet</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="E-mail"
          {...register("email", { required: "Campo não pode estar vazio" })}
        />
        {errors?.email && <p>{errors.email?.message}</p>}
        <input
          type="password"
          placeholder="Senha"
          {...register("password", { required: "Campo não pode estar vazio" })}
        />
        {errors?.password && <p>{errors.password?.message}</p>}
        {error ? <p>Email ou senha inválidos</p> : ""}
        <button type="submit">
          {loading ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={13} width={51} />
          ) : (
            "Entrar"
          )}
        </button>
      </form>
      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 312px;
  margin-top: calc(50vh - 156px);
  padding: 0 25px;

  h1 {
    font-size: 32px;
    color: #ffffff;
    font-family: "Saira Stencil One", cursive;
    margin-bottom: 30px;
    text-align: center;
  }

  input {
    display: block;
    width: 100%;
    height: 58px;
    margin: 0 auto 15px;
    padding: 0 15px;
    border-radius: 5px;
    background-color: ${({ loading }) => (loading ? "#F2F2F2" : "#FFFFFF")};
    color: ${({ loading }) => (loading ? "#AFAFAF" : "#000000")};
    font-size: 20px;
    font-family: "Raleway", sans-serif;
    pointer-events: ${({ loading }) => (loading ? "none" : "all")};

    ::placeholder {
      color: #000000;
    }
  }

  button {
    display: block;
    width: 100%;
    height: 46px;
    margin: 0 auto;
    background-color: #a32bd6;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    opacity: ${({ loading }) => (loading ? 0.7 : 1)};
    pointer-events: ${({ loading }) => (loading ? "none" : "all")};

    :hover {
      opacity: 0.8;
    }
  }

  a {
    display: block;
    text-align: center;
    margin-top: 40px;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    pointer-events: ${({ loading }) => (loading ? "none" : "all")};

    :hover {
      opacity: 0.8;
    }
  }

  p {
    margin-top: -10px;
    margin-bottom: 10px;
    color: red;
  }
`;
