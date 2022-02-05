import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import styled from "styled-components";

import useApi from "../../hooks/useApi";

export default function Stats() {
  const [data, setData] = useState(null);
  const api = useApi();

  const loadData = () => {
    api.category.getCategoriesSum()
      .then((res) => {
        const pieData = res.data.map((category) => { return {
          name: category.categories_name,
          value: Number(category.sum.replace("-", "")),
          color: category.categories_color
        }; });
        setData(pieData);
      })
      .catch((err) => {
        toast("Não foi possível conectar ao servidor!");
      });
  }

  useEffect(loadData, []);
  return data ? (
    <StatsContainer>
      <h1>Gastos por categoria</h1>
      <Link to="/conta">
        <IoChevronBackOutline className="icon" />
      </Link>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          outerRadius={100}
          label={(props) => {
            return props.name;
          }}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </StatsContainer>
  ) : (
    ""
  );
}

const StatsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h1 {
    font-size: 32px;
    color: #ffffff;
    font-family: "Saira Stencil One", cursive;
    margin-top: 130px;
    text-align: center;
  }

  a {
    position: absolute;
    color: #ffffff;
    font-size: 26px;
    cursor: pointer;
    top: 25px;
    right: 25px;
  }
`;