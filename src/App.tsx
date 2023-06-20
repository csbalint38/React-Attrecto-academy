import { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import BadgesPage from "./pages/BadgesPage/BadgesPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserPage from "./pages/UserPage/UserPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import { AUTH_TOKEN } from "./util/constants";
import { getDataFromTokenModel } from "./util/token";

interface AppProps {}

interface AppState {
  token: string | null;
  role: Role | null;
}

class App extends Component<AppProps, AppState> {
  readonly state: AppState = {
    token: localStorage.getItem(AUTH_TOKEN),
    role: getDataFromTokenModel("role") as Role,
  };

  setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN);
    }
    this.setState({ token, role: getDataFromTokenModel("role") as Role });
  };

  render() {
    const { token, role } = this.state;

    const userRouteElement =
      role === "ADMIN" ? <UserPage /> : <Navigate to="/home" replace />;

    return (
      <div className="App">
        <header className="App-header">
          <Navbar isLoggedIn={!!token} setToken={this.setToken} />
        </header>
        <Routes>
          {token ? (
            <>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/user/:id" element={userRouteElement} />
              <Route path="/user" element={userRouteElement} />
              <Route path="/badges" element={<BadgesPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<LoginPage setToken={this.setToken} />}
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </div>
    );
  }
}

export default App;
