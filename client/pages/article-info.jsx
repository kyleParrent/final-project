import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class ArticleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: props.article,
      newReview: null
    };
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.articleInfo)
    };
    fetch('/api/article-info', req)
      .then(res => res.json())
      .then(result => {
        if (result === undefined) {
          this.setState({ newReview: true })
        }
      });
  }

  render() {
    return (
      <div>
        <div className='row'>
          <img></img>
          <h1></h1>
        </div>
        <div className="row">
          <div className="col-5">
            <h3></h3>
            <h3></h3>
            <h3></h3>
          </div>
          <div className="col-5">
            <button></button>
            <button></button>
          </div>
          <div className="row">
            <h3></h3>
            <p></p>
            <h3></h3>
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}

ArticleInfo.contextType = AppContext;
