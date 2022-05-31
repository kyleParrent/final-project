import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div className='container'>
          <a href="#" className="navbar-brand">THE OPINION</a>
          <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#navmenu"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#" className="nav-link">Top Headings</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Reviews</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Sign In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
