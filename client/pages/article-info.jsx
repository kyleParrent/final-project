import React from 'react';
import AppContext from '../lib/app-context';

export default class ArticleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: props.article,
      newReview: null
    };
  }



  render() {
    const theArticle = this.state.articleInfo;
    const theDate = theArticle.publishedAt;
    const date = theDate.split("T");
    return (
      <div className='d-flex justify-content-center'>
        <div className='border border-2 border-dark info-box'>
          <div className='row'>
            <img src={theArticle.image}></img>
            <h1 className='d-flex justify-content-center'>{theArticle.title}</h1>
          </div>
          <div className="row">
            <div className="col-6 border-end border-dark border-3">
              <h3>From: {theArticle.source.name}</h3>
              <h3>Date: {date[0]}</h3>
            </div>
            <div className="col-6">
              <button className='d-flex'>Source</button>
              <button>Rate/Review</button>
            </div>
            <div className="row">
              <h3></h3>
              <p></p>
              <h3></h3>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleInfo.contextType = AppContext;
