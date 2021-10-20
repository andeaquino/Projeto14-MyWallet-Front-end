import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { getEntries } from '../../services/API';

export default function Account() {
    const [name, setName] = useState("");
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        getEntries()
            .then(res => {
                setEntries(res.data);
            });
    }, []);

    return (
        <AccountContainer>
            <header> 
                <h1>Olá, {name}</h1>
                <RiLogoutBoxRLine className="logout-icon"/>
            </header>   
            <EntriesContainer>
                {entries.length === 0 
                    ? <>
                        <ul>
                            {entries.map(entry => <li><spam className="date">{entry.date}</spam>{entry.description}<spam className="price">{entry.price}</spam></li>)}
                            <li><spam className="date">30/11</spam>Almoço mãe<spam className="price">39,90</spam></li>
                        </ul>
                        <p>
                            SALDO
                            <spam className="price">4445</spam>
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

        li {
            width: 100%;
            color: #000000;
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 18px;
            position: relative;
            text-align: start;

            .date {
                color: #C6C6C6;
                padding-right: 8px;
            }

            .price {
                position: absolute;
                font-weight: 400;
                right: 0;
                top: 0;
            }
        }

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

        .price {
            position: absolute;
            font-weight: 400;
            right: 10px;
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