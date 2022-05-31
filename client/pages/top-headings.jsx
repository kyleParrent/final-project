import React from 'react';
import HeadingResult from '../components/heading-result';

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
        this.setState({ articles });
      });
  }

  render() {
    return (
    <div className="row justify-content-center">
        <h1 className='d-flex justify-content-center'>Top Headings</h1>
      {
        this.state.articles.map((article, index) => {
          return <HeadingResult key={index} article={article} />;
        })
      }
    </div>
    );
  }
}
