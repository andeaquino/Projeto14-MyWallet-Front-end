import { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../services/API";
import Loader from "react-loader-spinner";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const register = (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            alert("Campos de senha apresentam valores diferentes");
            return;
        }
        setLoading(true);

        const body = {
            name,
            email,
            password
        }

        signUp({body})
            .then((res) => {
                
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPass("");
                
                setLoading(false);
                history.push('/');
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 409) {
                    alert("Email já está em uso!");
                }
                if (err.response.status === 400) {
                    alert("Campos inválidos!");
                }
            });
    }

    return (
        <RegisterContainer loading={loading}>
            <h1>MyWallet</h1>
            <form onSubmit={register}>
                <input 
                    type='text'
                    placeholder='Nome'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    type='email'
                    placeholder = "E-mail"  
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input 
                    type='password'
                    placeholder='Senha'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input 
                    type='password'
                    placeholder='Confirme a senha'
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    required
                />
                <button type='submit'>
                    {loading 
                        ? <Loader type="ThreeDots" color="#FFFFFF" height={13} width={51} /> 
                        : "Cadastrar"
                    }
                </button>
            </form>
            <Link to='/'>
                Já tem uma conta? Entre agora!
            </Link>
        </RegisterContainer>
    );
}

const RegisterContainer = styled.div`
    height: 462px;
    margin-top: calc(50vh - 231px);
    padding: 0 25px;

    h1 {
        font-size: 32px;
        color: #FFFFFF;
        font-family: 'Saira Stencil One', cursive;
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
        background-color: ${({loading}) => loading ? '#F2F2F2' : '#FFFFFF'};;
        color: ${({loading}) => loading ? '#AFAFAF' : '#000000'};
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        pointer-events: ${({loading}) => loading ? 'none' : 'all'};

        ::placeholder {
            color: #000000;
        }
    }

    button {
        display: block;
        width: 100%;
        height: 46px;
        margin: 0 auto;
        background-color: #A32BD6;
        border-radius: 5px;
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
        opacity: ${({loading}) => loading ? 0.7 : 1};
        pointer-events: ${({loading}) => loading ? 'none' : 'all'};

        :hover {
            opacity: 0.8;
        }
    }

    a {
        display: block;
        text-align: center;
        margin-top: 40px;
        text-decoration: none;
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
        pointer-events: ${({loading}) => loading ? 'none' : 'all'};

        :hover {
            opacity: 0.8;
        }
    }
`;