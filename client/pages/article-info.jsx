import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class ArticleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: []
    };
  }

  componentDidMount() {
    fetch('/api/article-info')
      .then(res => res.json())
      .then(result => {
      });
  }

  render() {
    window.location.hash = 'article-info'
    return (
      <div>
        <div className='row'>

        </div>
      </div>
    );
  }
}

ArticleInfo.contextType = AppContext;
