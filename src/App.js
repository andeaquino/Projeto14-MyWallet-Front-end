import GlobalStyle from "./shared/GlobalStyle";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddIncome from "./pages/AddIncome/AddIncome";
import AddExpense from "./pages/AddExpense/AddExpense";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/cadastro'>
          <Register />
        </Route>
        <Route exact path='/conta'>

        </Route>
        <Route exact path='/nova-entrada'>
          <AddIncome />
        </Route>
        <Route exact path='/nova-saida'>
          <AddExpense />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
