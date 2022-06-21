import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    let signNav;
    let reviewNav;
    if (user) {
      signNav = (
        <a href="#" onClick={handleSignOut} className="nav-link">Sign Out</a>
      );
      const theHref = `#user-reviews?userId=${user.userId}`;
      reviewNav = (
        <a href= {theHref} className="nav-link">Reviews</a>
      );
    } else {
      signNav = (
      <a href="#sign-in" className="nav-link">Sign In</a>
      );
      reviewNav = (
        <a href="#sign-in" className="nav-link">Reviews</a>
      );
    }
    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div className='container'>
          <a href="#" className="nav-link logo p-0 text-white">THE OPINION</a>
          <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#navmenu"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#search" className="nav-link">Search</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Top Headings</a>
              </li>
              <li className="nav-item">
                {
                  reviewNav
                }
              </li>
              <li className="nav-item">
                {
                  signNav
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.contextType = AppContext;
