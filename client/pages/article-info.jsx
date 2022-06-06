import React from 'react';
import AppContext from '../lib/app-context';

export default class ArticleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: props.articleId,
      articleInfo: props.info,
      reviewRating: null,
      reviewComment: null
    };
  }

  render() {
    if (!this.props.article) {
      return null;
    }
    const theArticle = this.props.article;
    const theDate = theArticle.publishedAt;
    const date = theDate.split('T');
    return (
      <div className='d-flex justify-content-center m-4'>
        <div className='border border-2 border-dark info-box'>
          <div className='row justify-content-center'>
            <div className="col-11">
              <img className='img-fluid mt-4' src={theArticle.image}></img>
              <h1 className='text-center'>{theArticle.title}</h1>
            </div>
          </div>
          <div className="row justify-content-center m-4">
            <div className="col-12 d-flex justify-content-center">
              <div className="col-8 border-end border-dark border-3">
                <h3>From: {theArticle.source.name}</h3>
                <h3>Date: {date[0]}</h3>
              </div>
              <div className="col-4">
                <a className="btn btn-dark d-flex m-2 text-white" href={theArticle.url} role="button" target="_blank" rel="noreferrer">Full Article</a>
                <a className="btn btn-dark d-flex m-2 text-white" href={`#review?articleIndex=${this.props.articleIndex}`} role="button">Rate / Review</a>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11">
              <h3>Description</h3>
              <p>{theArticle.description}</p>
              <h3>Content</h3>
              <p>{theArticle.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleInfo.contextType = AppContext;
