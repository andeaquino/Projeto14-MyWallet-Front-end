import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { addEntry } from "../../services/API";
import Loader from "react-loader-spinner";
import CurrencyInput from 'react-currency-input-field';

export default function AddExpense() {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const addExpense = (e) => {
        e.preventDefault();
        setLoading(true);

        const body = {
            value: value.toFixed(2),
            description
        }

        addEntry(body)
            .then(() => {
                setLoading(false);
                setValue("");
                setDescription("");
                history.push('/conta');
            })
            .catch(() => {
                setLoading(false);
            });
    }

    return (
        <ExpenseContainer loading={loading}>
            <h1>Nova saída</h1>
            <form onSubmit={addExpense}>
                <CurrencyInput 
                    placeholder = "Valor"
                    prefix='R$ '
                    value={value}
                    decimalsLimit={2}
                    onValueChange={value => setValue(value)}
                />
                <input 
                    type='text'
                    placeholder='Descrição'
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
                <button type='submit'>
                    {loading 
                        ? <Loader type="ThreeDots" color="#FFFFFF" height={13} width={51} /> 
                        : "Salvar saída"
                    }
                </button>
            </form>
        </ExpenseContainer>
    );
}

const ExpenseContainer = styled.div`
    margin-top: 35px;
    padding: 0 25px;

    h1 {
        font-size: 26px;
        color: #FFFFFF;
        font-family: 'Raleway', sans-serif;
        margin-bottom: 40px;
        text-align: start;
        font-weight: 700;
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
`;