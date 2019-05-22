import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LayoutContext } from "containers/Layout/Layout";
import CursorAnchor from "components/CursorDot/CursorAnchor";
import GridIcon from "./GridIcon/GridIcon";
import AboutIcon from "./AboutIcon/AboutIcon";
import "./Nav.scss";

const Nav = () => {
  const { view, navInverted, currentUid } = useContext(LayoutContext);

  const linkTo = link => {
    if (view === "root") {
      return `/${link}`;
    } else if (currentUid) {
      return `/work/${currentUid}`;
    }
    return "/";
  };

  const navState = [
    navInverted && view === "root" ? "nav--dark" : "",
    `-view-is-${view}`
  ].join(" ");

  return (
    <nav className={`nav -wrap-nav ${navState}`}>
      <div className="nav__inner">
        {["work", "about"].map(link => (
          <div className="nav__item" key={link}>
            <CursorAnchor textId={view === "root" ? link : "close"}>
              <Link to={(() => linkTo(link))()}>
                {link === "work" && <GridIcon view={view} />}
                {link === "about" && <AboutIcon view={view} />}
              </Link>
            </CursorAnchor>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
