import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from "recharts";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import styled from "styled-components";

import useApi from "../../hooks/useApi";
import updateMonthlySum from "../../services/updateMonthlySum";

export default function Stats() {
  const [expenses, setExpenses] = useState(null);
  const [monthlyTotal, setMonthlyTotal] = useState(null);
  const api = useApi();

  const loadData = () => {
    api.category.getCategoriesSum()
      .then((res) => {
        const pieData = res.data.map((category) => { return {
          name: category.categories_name,
          value: Number(category.sum.replace("-", "")),
          color: category.categories_color
        }; });
        setExpenses(pieData);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Não foi possível conectar ao servidor!");
        }
      });
    
    api.entry.getMonthlyTotal()
      .then((res) => {
        const updatedMonthlySum = updateMonthlySum(res.data);
        setMonthlyTotal(updatedMonthlySum);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Não foi possível conectar ao servidor!");
        }
      });
  }

  useEffect(loadData, []);

  return expenses ? (
    <StatsContainer>
      <h1>Despesas do mês</h1>
      <Link to="/conta">
        <IoChevronBackOutline className="icon" />
      </Link>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={expenses}
          outerRadius={110}
          fill="#8884d8"
        >
          {expenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            backgroundColor: "#dfdfdf",
            border: "1px solid gray",
            borderRadius: 15,
            lineHeight: "30px",
          }}
        />
      </PieChart>
      <h1>Saldo mensal</h1>
      <LineChart
        width={380}
        height={300}
        data={monthlyTotal}
        margin={{
          top: 25,
          right: 30,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          label={{
            value: "Mês",
            position: "insideBottomRight",
            dy: 10,
            fill: "#ffffff",
          }}
          stroke="#E5CDB1"
        />
        <YAxis
          dataKey="saldo"
          label={{
            value: "Valor",
            angle: -90,
            position: "insideLeft",
            fill: "#ffffff",
          }}
          stroke="#E5CDB1"
        />
        <Tooltip fill="#E5CDB1" />
        <Legend fill="#E5CDB1" />
        <Line
          type="monotone"
          dataKey="saldo"
          stroke="#E5CDB1"
          activeDot={{ r: 8 }}
        />
      </LineChart>
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
    font-size: 30px;
    font-weight: 700;
    color: #ffffff;
    font-family: "Raleway", sans-serif;
    margin-top: 60px;
    text-align: center;
  }

  h1:last-child {
    margin-top: 20px;
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