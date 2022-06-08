import React from 'react';
import AppContext from '../lib/app-context';
import AllReviews from '../components/all-reviews';

export default class ArticleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: null,
      articleReviews: []
    };
  }

  componentDidMount() {
    if (this.props.reviewedArticleId) {
      let artInfo;
      fetch(`/api/articles/${this.props.reviewedArticleId}`)
        .then(res => res.json())
        .then(result => {
          artInfo = result;
          fetch(`/api/all-user-reviews/${this.props.reviewedArticleId}`)
            .then(res => res.json())
            .then(result => {
              this.setState({ articleInfo: artInfo, articleReviews: result });
            });
        });
    } else {
      fetch(`/api/article-info?title=${this.props.article.title}&publishedAt=${this.props.article.publishedAt}`)
        .then(res => res.json())
        .then(result => {
          if (!result.articleId) {
            this.setState({ articleInfo: this.props.article });
            return;
          }
          const artId = result.articleId;
          fetch(`/api/all-user-reviews/${artId}`)
            .then(res => res.json())
            .then(result => {
              this.setState({ articleInfo: this.props.article, articleReviews: result });
            });
        });
    }
  }

  render() {
    if (!this.state.articleInfo) {
      return;
    }
    const button = this.props.reviewedArticleId
      ? <a className="btn btn-secondary d-flex m-2 text-white info-button" role="button">Already Reviewed</a>
      : <a className="btn btn-dark d-flex m-2 text-white info-button" href={`#review?articleIndex=${this.props.articleIndex}`} role="button">Rate / Review</a>;
    const theArticle = this.state.articleInfo;
    const theDate = theArticle.publishedAt;
    const date = theDate.split('T');
    let newSection;
    if (this.state.articleReviews.length === 0) {
      newSection = (
        <div className='row'>
          <div className='col-12 d-flex justify-content-center'>
              <h3 className='m-3'>No User Reviews</h3>
          </div>
        </div>
      );
    } else {
      newSection = this.state.articleReviews.map((article, index) => {
        return <AllReviews key={index} article={article} index={index} />;
      });

    }
    return (
      <div>
        <div className='d-flex justify-content-center m-4' id='main'>
          <div className='border border-2 border-dark info-box'>
            <div className='row justify-content-center'>
              <div className="col-11">
                <div className='d-flex justify-content-center'>
                  <img className='img-fluid mt-4' src={theArticle.image}></img>
                </div>
                <h1 className='text-center'>{theArticle.title}</h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-11 d-flex justify-content-center">
                <div className="col-8 border-end border-dark border-3">
                  <h3>From: {theArticle.source.name}</h3>
                  <h3>Date: {date[0]}</h3>
                </div>
                <div className="col-4">
                  <a className="btn btn-dark d-flex m-2 text-white info-button" href={theArticle.url} role="button" target="_blank" rel="noreferrer">Full Article</a>
                  { button }
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
        <div className="row justify-content-center">
          <div className='d-flex justify-content-center align-items-center mt-4'>
            <h1>Ratings / Reviews</h1>
          </div>
          <div className='col-12 d-flex justify-content-center'>
            <div className='border border-2 border-dark no-reviews mb-4 ms-4 me-4'>
              {
               newSection
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleInfo.contextType = AppContext;
