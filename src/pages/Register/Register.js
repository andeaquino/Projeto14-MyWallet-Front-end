import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import useApi from "../../hooks/useApi";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const api = useApi();

  const onSubmit = (data) => {
    const { name, email, password, confirmPass } = data;

    if (password !== confirmPass) {
      setPassError(true);
      return;
    }

    setEmailError(false);
    setPassError(false);
    setLoading(true);

    const body = {
      name,
      email,
      password,
    };

    api.user.signUp(body)
      .then((res) => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response.status === 409) {
          setEmailError(true);
        }
      });
  };

  return (
    <RegisterContainer loading={loading}>
      <h1>MyWallet</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nome"
          {...register("name", { required: "Campo não pode estar vazio" })}
        />
        {errors?.name && <p>{errors.name?.message}</p>}
        <input
          type="email"
          placeholder="E-mail"
          {...register("email", { required: "Campo não pode estar vazio" })}
        />
        {emailError ? <p>Email já está em uso</p> : ""}
        {errors?.email && <p>{errors.email?.message}</p>}
        <input
          type="password"
          placeholder="Senha"
          {...register("password", {
            required: "Campo não pode estar vazio",
            minLength: {
              value: 8,
              message: "Senha deve ter pelo menos 8 caracteres",
            },
          })}
        />
        {errors?.password && <p>{errors.password?.message}</p>}
        <input
          type="password"
          placeholder="Confirme a senha"
          {...register("confirmPass", {
            required: "Campo não pode estar vazio",
          })}
        />
        {passError ? <p>Senhas não combinam</p> : ""}
        {errors?.confirmPass && <p>{errors.confirmPass?.message}</p>}
        <button type="submit">
          {loading ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={13} width={51} />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </RegisterContainer>
  );
}

const RegisterContainer = styled.div`
  height: 462px;
  margin-top: calc(50vh - 231px);
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
    background-color: #8c97ea;
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
