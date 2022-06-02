import React from 'react';
import Article from '../components/article';
import AppContext from '../lib/app-context';

export default class TopHeadings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    fetch('https://gnews.io/api/v4/top-headlines?lang=en&token=db7ace67a38e6b5a80d8e73290798c87')
      .then(res => res.json())
      .then(result => {
        const articles = result.articles;
        this.context.setArticles(articles);
        this.setState({ articles });
      });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <h1 className='d-flex justify-content-center'>Top Headings</h1>
        {
          this.state.articles.map((article, index) => {
            return <Article key={index} article={article} index={index} />;
          })
        }
      </div>

    );
  }
}

TopHeadings.contextType = AppContext;
