import React from 'react';
import AppContext from '../lib/app-context';

export default class ArticleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: props.article,
      articleId: null
    };
  }

  componentDidMount() {
    const theArticle = this.state.articleInfo;
    const theTitle = theArticle.title;
    const theSource = theArticle.source.name;
    fetch(`/api/article-info?title=${theTitle}&source=${theSource}`)
      .then(res => res.json())
      .then(result => {
        if (result.length !== 0) {
          const theId = result[0].articleId;
          this.setState({ articleId: theId });
        }
      });
  }

  render() {
    const theArticle = this.state.articleInfo;
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
                <a className="btn btn-dark d-flex m-2 text-white" href="" role="button" target="_blank">Rate/Review</a>
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
