import GlobalStyle from "./shared/GlobalStyle";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/cadastro'>

        </Route>
        <Route exact path='/registros'>

        </Route>
        <Route exact path='/nova-entrada'>

        </Route>
        <Route exact path='/nova-saida'>

        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
