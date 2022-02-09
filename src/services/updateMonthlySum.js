const updateMonthlySum = (data) => {
  const months = [
    {
      month: "01",
      saldo: "0",
    },
    {
      month: "02",
      saldo: "0",
    },
    {
      month: "03",
      saldo: "0",
    },
    {
      month: "04",
      saldo: "0",
    },
    {
      month: "05",
      saldo: "0",
    },
    {
      month: "06",
      saldo: "0",
    },
    {
      month: "07",
      saldo: "0",
    },
    {
      month: "08",
      saldo: "0",
    },
    {
      month: "09",
      saldo: "0",
    },
    {
      month: "10",
      saldo: "0",
    },
    {
      month: "11",
      saldo: "0",
    },
    {
      month: "12",
      saldo: "0",
    },
  ];

  data.forEach((elem) => {
    months[elem.month - 1].saldo = elem.sum;
  });
  return months;
}

export default updateMonthlySum;