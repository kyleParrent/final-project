import React from 'react';
import Article from '../components/article';
import AppContext from '../lib/app-context';

export default class TopHeadings extends React.Component {

  render() {
    return (
      <div className="row justify-content-center">
        <div className='d-flex justify-content-center align-items-center mt-4'>
          <h1>Top Headings</h1>
        </div>
        {
          this.props.articles.map((article, index) => {
            return <Article key={index} article={article} index={index} />;
          })
        }
      </div>

    );
  }
}

TopHeadings.contextType = AppContext;
