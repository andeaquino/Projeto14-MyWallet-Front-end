import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { getEntries } from '../../services/API';
import Entry from "./components/Entry.js";

export default function Account() {
    const [entries, setEntries] = useState([]);
    const [total, setTotal] = useState("");
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("user");
        history.push('/');
    }

    useEffect(() => {
        if(user) {
            getEntries({token: user.token})
                .then(res => {
                    setEntries(res.data.entries);
                    setTotal(res.data.total);
                });
        } else {
            history.push("/");
        }
    }, []);

    return (
        <AccountContainer>
            <header> 
                <h1>Olá, {user?.name}</h1>
                <RiLogoutBoxRLine className="logout-icon" onClick={logout}/>
            </header>   
            <EntriesContainer isNegative={total?.includes('-')}>
                {entries.length !== 0 
                    ? <>
                        <ul>
                            {entries.map(entry => <Entry date={entry.date} description={entry.description} value={entry.value} />)}
                        </ul>
                        <p>
                            SALDO
                            <span className="total">{total.replace('R$ ', '').replace('-',' ')}</span>
                        </p>
                    </>
                    : <h2>Não há registros de entrada ou saída</h2>
                }
                
                
            </EntriesContainer>
            <AddEntryContainer>
                <Link to='/nova-entrada'>
                    <AiOutlinePlusCircle className="icon"/>
                    <p>Nova entrada</p>
                </Link>
                <Link to='/nova-saida'>
                    <AiOutlineMinusCircle className="icon"/>
                    <p>Nova saída</p>
                </Link>
            </AddEntryContainer>
        </AccountContainer>
    );
}

const AccountContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 25px;

    header {
        display: flex;
        justify-content: space-between;

        h1 {
            font-size: 26px;
            color: #FFFFFF;
            font-family: 'Raleway', sans-serif;
            text-align: start;
            font-weight: 700;
        }

        .logout-icon {
            color: #FFFFFF;
            font-size: 25px;
            cursor: pointer;
        }
    }
`;

const EntriesContainer = styled.div`
    height: 100%;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin: 25px 0 16px;
    overflow: hidden;
    font-family: 'Raleway', sans-serif;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    h2 {
        color: #868686;
        font-size: 20px;
        text-align: center;
        padding: 0 60px;
    }

    ul {
        height: calc(100% - 35px);
        overflow-y: scroll;
        padding: 20px 10px 0;
        position: relative;
        display: flex;
        flex-direction: column;

        ::-webkit-scrollbar {
            width: 0px;
            background: transparent; 
        }
    }

    p {
        width: 100%;
        color: #000000;
        padding: 8px 10px 0px;
        font-weight: 700;
        position: relative;
        text-align: start;
        font-size: 17px;

        .total {
            position: absolute;
            font-weight: 400;
            right: 10px;
            color: ${({isNegative}) => isNegative ? '#C70000' : '#03AC00'};
        }
    }
`;

const AddEntryContainer = styled.div`
    display: flex;
    justify-content: space-between;

    a {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 114px;
        width: 48%;
        background-color: #A32BD6;
        border-radius: 5px;
        color: #FFFFFF;
        padding: 8px;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 17px;

        .icon {
            font-size: 25px;
        }
    }
`;