import { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import CurrencyInput from "react-currency-input-field";

import useApi from "../../hooks/useApi";
import Select from "./components/Select";

export default function AddEntry() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { entryType } = useParams();
  const history = useHistory();
  const api = useApi();

  const submitEntry = (e) => {
    e.preventDefault();
    
    if (entryType === "despesa" && !category) {
      toast.error("Escolha uma categoria!");
      return;
    }

    setLoading(true);

    const body = {
      value: entryType === "despesa" ? -Number(value) : Number(value),
      description,
      category: category?.name
    };

    if (body.value === 0) {
      toast.error("Insira um valor diferente de zero");
      setLoading(false);
    } else {
      api.entry.addEntry(body)
        .then(() => {
          setValue("");
          setDescription("");
          setLoading(false);
          history.push("/conta");
          toast("Entrada salva!")
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Não foi possível conectar ao servidor!");
          }
          setLoading(false);
        });
    }
  };

  const loadCategories = () => {
    api.category
      .getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Não foi possível conectar ao servidor!");
        }
      });
  }

  useEffect(loadCategories, [])

  return (
    <EntryContainer loading={loading}>
      <header>
        <h1>{entryType === "saida" ? "Nova despesa" : "Nova receita"}</h1>
        <Link to="/conta">
          <IoChevronBackOutline className="icon" />
        </Link>
      </header>

      <form onSubmit={submitEntry}>
        <CurrencyInput
          placeholder="Valor"
          prefix="R$ "
          value={value}
          decimalsLimit={2}
          onValueChange={(value) => setValue(value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {entryType === "despesa" ? (
          <Select
            selectedOption={category}
            setSelectedOption={setCategory}
            options={categories}
            label={"Escolha uma categoria"}
          />
        ) : (
          ""
        )}
        <button type="submit">
          {loading ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={13} width={51} />
          ) : entryType === "despesa" ? (
            "Salvar despesa"
          ) : (
            "Salvar receita"
          )}
        </button>
      </form>
    </EntryContainer>
  );
}

const EntryContainer = styled.div`
  margin-top: 35px;
  padding: 0 25px;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 26px;
      color: #ffffff;
      font-family: "Raleway", sans-serif;
      margin-bottom: 40px;
      text-align: start;
      font-weight: 700;
    }

    .icon {
      color: #ffffff;
      font-size: 26px;
      cursor: pointer;
    }
  }

  input,
  select {
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
`;
