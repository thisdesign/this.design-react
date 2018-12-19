import React from 'react';
import { Link } from 'react-router-dom';
import LayoutContext from 'containers/Layout/LayoutContext';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';
import './Nav.css';

class Nav extends React.Component {
  static contextType = LayoutContext
  render() {
    const { scrolledPastCsCover, view, currentCaseStudy } = this.context;
    const linkTo = (link) => {
      if (view === 'root') {
        return `/${link}`;
      } else if (currentCaseStudy) {
        return `/work/${currentCaseStudy}`;
      }
      return '/';
    };

    const navLinks = ['work', 'about'];
    const navState = [
      scrolledPastCsCover && view === 'root'
        ? 'nav--dark'
        : '',
      `-view-is-${view}`,
    ].join(' ');

    return (
      <nav className={`nav -wrap-nav ${navState}`}>
        <div className="nav__inner">
          {navLinks.map(link => (
            <div className="nav__item" key={link} >
              <CursorAnchor textId={view === 'root' ? link : 'close'}>
                <Link to={(() => linkTo(link))()} >
                  {link === 'work' && <GridIcon view={view} />}
                  {link === 'about' && <AboutIcon view={view} />}
                </Link>
              </CursorAnchor>
            </div>
          ))}
        </div>
      </nav>
    );
  }
}

export default Nav;
