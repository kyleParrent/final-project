import React from 'react';
import Article from '../components/article';
import AppContext from '../lib/app-context';

export default class TopHeadings extends React.Component {

  render() {
    const { isLoading } = this.context;
    let result;
    if (isLoading === true) {
      result = (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      (
        result =
          this.props.articles.map((article, index) => {
            return <Article key={index} article={article} index={index} />;
          })
      );
    }
    return (
      <div className="row justify-content-center">
        <div className='d-flex justify-content-center align-items-center mt-4'>
          <h1>Top Headings</h1>
        </div>
        {
          result
        }
      </div>

    );
  }
}

TopHeadings.contextType = AppContext;
