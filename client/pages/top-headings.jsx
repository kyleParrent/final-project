import React from 'react';
import Article from '../components/article';
import AppContext from '../lib/app-context';

export default class TopHeadings extends React.Component {

  render() {
    return (
      <div className="row justify-content-center">
        <h1 className='d-flex justify-content-center'>Top Headings</h1>
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
