import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlinePieChart,
} from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import styled from "styled-components";

import Entry from "./components/Entry.js";
import UserContext from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";

export default function Account() {
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const history = useHistory();
  const api = useApi();

  const logout = () => {
    const confirmation = window.confirm("Tem certeza que deseja sair?");
    if (confirmation) {
      localStorage.removeItem("user");
      setUserInfo(null);
      history.push("/");
    }
  };

  const loadEntries = () => {
    setLoading(true);
    api.entry.getEntries()
      .then((res) => {
        setEntries(res.data.entries);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Não foi possível conectar ao servidor!");
        }
        setLoading(false);
      });
  };

  useEffect(loadEntries, []);

  return (
    <AccountContainer>
      <header>
        <h1>Olá, {userInfo.name}</h1>
        <RiLogoutBoxRLine className="logout-icon" onClick={logout} />
      </header>
      <EntriesContainer isNegative={total?.includes("-")}>
        {loading ? (
          <LoaderStyled type="ThreeDots" color="#6D7CE4" height={23} width={81} />
        ) : entries.length !== 0 ? (
          <>
            <ul>
              {entries.map((entry) => (
                <Entry
                  date={entry.date}
                  description={entry.description}
                  value={entry.value}
                />
              ))}
            </ul>
            <p>
              SALDO
              <span className="total">
                {total.replace("R$ ", "").replace("-", " ")}
              </span>
            </p>
          </>
        ) : (
          <h2>Não há registros de receita ou despesa</h2>
        )}
      </EntriesContainer>
      <AddEntryContainer>
        <Link to="adicionar/receita">
          <AiOutlinePlusCircle className="icon" />
          <p>Nova receita</p>
        </Link>
        <Link to="adicionar/despesa">
          <AiOutlineMinusCircle className="icon" />
          <p>Nova despesa</p>
        </Link>
        <Link to="/estatisticas">
          <AiOutlinePieChart className="icon" />
          <p>Estatísticas</p>
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
      color: #ffffff;
      font-family: "Raleway", sans-serif;
      text-align: start;
      font-weight: 700;
    }

    .logout-icon {
      color: #ffffff;
      font-size: 25px;
      cursor: pointer;
    }
  }
`;

const LoaderStyled = styled(Loader)`
  text-align: center;
`;

const EntriesContainer = styled.div`
  height: 100%;
  border-radius: 5px;
  background-color: #ffffff;
  margin: 25px 0 16px;
  overflow: hidden;
  font-family: "Raleway", sans-serif;
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
      color: ${({ isNegative }) => (isNegative ? "#C70000" : "#03AC00")};
    }
  }
`;

const AddEntryContainer = styled.div`
  height: 250px;
  width: calc(100% - 10px);
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  column-gap: 10px;
  row-gap: 10px;

  a {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: #8c97ea;
    border-radius: 5px;
    color: #ffffff;
    padding: 8px;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 17px;

    .icon {
      font-size: 25px;
    }

    :hover {
      opacity: 0.8;
    }
  }

  a:last-child {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 2;
    justify-content: center;

    .icon {
      font-size: 55px;
      margin-bottom: 10px;
    }
  }
`;
