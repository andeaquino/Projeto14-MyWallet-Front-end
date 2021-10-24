import styled from "styled-components";
import dayjs from "dayjs";

export default function Entry({date, description, value}) {
    return (
        <EntryContainer>
            <Date>{dayjs(date).format('DD/MM')}</Date>
            <Description>{description}</Description>
            <Value isExpense={value.includes('-')}>{value.replace('R$ ', '').replace('-',' ')}</Value>
        </EntryContainer>
    );
}

const EntryContainer = styled.li`
    display: grid;
    width: 100%;
    grid-template-columns: 50px auto auto;
    margin-bottom: 18px;
    font-size: 16px;
    font-weight: 400;
    color: #000000;
   
`;

const Date = styled.span`
    display: block;
    color: #C6C6C6;
`;

const Description = styled.span`
    display: block;
    text-align: start;
    overflow: hidden;
`;

const Value = styled.span`
   display: block;
   text-align: end;
   color: ${({isExpense}) => isExpense ? '#C70000' : '#03AC00'};
`;