import GlobalStyle from "./shared/GlobalStyle";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import AddEntry from "./pages/AddEntry/AddEntry";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/cadastro">
          <Register />
        </Route>
        <Route exact path="/conta">
          <Account />
        </Route>
        <Route exact path="/:entryType">
          <AddEntry />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
