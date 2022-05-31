import React from 'react';
import TopHeadings from './pages/top-headings';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />;
        <div className='container'>
          <TopHeadings />;
        </div>
      </div>
    );
  }
}
