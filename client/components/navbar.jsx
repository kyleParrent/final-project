import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div className='container'>
          <a href="#" className="nav-link logo p-0">THE OPINION</a>
          <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#navmenu"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#search" className="nav-link text-decoration-underline">Search</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-decoration-underline">Top Headings</a>
              </li>
              <li className="nav-item">
                <a href="#user-reviews?userId=1" className="nav-link text-decoration-underline">Reviews</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-decoration-underline">Sign In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
