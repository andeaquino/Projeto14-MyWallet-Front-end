import GlobalStyle from "./shared/GlobalStyle";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
            {userInfo ? <Redirect to="/conta" /> : <Login />}
          </Route>
          <Route exact path="/cadastro">
            {userInfo ? <Redirect to="/conta" /> : <Register />}
          </Route>
          <Route exact path="/conta">
            {userInfo ? <Account /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/:entryType">
            {userInfo ? <AddEntry /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
