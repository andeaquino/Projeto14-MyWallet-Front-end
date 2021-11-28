import GlobalStyle from "./shared/GlobalStyle";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import AddEntry from "./pages/AddEntry/AddEntry";

function App() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
