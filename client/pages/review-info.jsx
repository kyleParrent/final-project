import React from 'react';
import Review from '../components/review';

export default class ReviewInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/reviews/${this.props.userId}`, req)
      .then(res => res.json())
      .then(result => {
        this.setState({ reviews: result });
      });
  }

  render() {
    if (this.state.reviews === []) {
      return (
        <div>
          <p>No Reviews</p>
        </div>
      );
    }
    return (
        <div className="row justify-content-center">
          <div className='d-flex justify-content-center align-items-center mt-4'>
            <h1>Your Opinions</h1>
          </div>
          <div className='reviews-box'>
            {
                      this.state.reviews.map((review, index) => {
                        return <Review key={index} review={review} />;
                      })
            }
          </div>
        </div>

    );
  }
}
