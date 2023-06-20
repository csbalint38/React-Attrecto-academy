import { FC } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../button/Button";
import { getDataFromTokenModel } from "../../util/token";

import classes from "./Navbar.module.scss";
import "./Navbar.scss";

interface RouteConfig {
  link: string;
  label: string;
}

interface NavBarProps {
  isLoggedIn: boolean;
  setToken: (token: null) => void;
}

const Navbar: FC<NavBarProps> = ({ isLoggedIn, setToken }) => {
  const email = getDataFromTokenModel("email");
  const routes: RouteConfig[] = [
    {
      link: "/home",
      label: "Home",
    },
    {
      link: "/users",
      label: "Users",
    },
    {
      link: "/badges",
      label: "Badges",
    },
  ];

  return (
    <nav className={classNames("navbar p-3", [classes.Navbar])}>
      <div
        className={classNames(
          classes.MinWidth0,
          "d-flex align-items-center justify-content-between flex-grow-1 flex-wrap"
        )}
      >
        {isLoggedIn && (
          <div className="d-flex">
            {routes.map(({ link, label }) => (
              <NavLink key={link} to={link} className="nav-link me-4">
                {label}
              </NavLink>
            ))}
          </div>
        )}
        <div
          className={classNames("d-flex align-items-center", classes.MinWidth0)}
        >
          <p className={classNames(classes.Greeting, "mb-0")}>
            Welcome {email ? email : "to Attrecto Academy"}
          </p>
          {isLoggedIn && (
            <Button
              onClick={() => setToken(null)}
              color="secondary"
              className="ms-3"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
