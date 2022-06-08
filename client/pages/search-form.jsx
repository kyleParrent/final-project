import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='d-flex justify-content-center'>
        <div className='search-container'>
          <div className='d-flex justify-content-center mt-3'>
            <h3>Search</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <div className='border-top border-end border-start border-2 border-dark d-flex justify-content-center'>
                <div className="input-group mb-3 search-bar">
                  <span className="input-group-text mt-3" id="keyword">Keyword</span>
                  <input type="text" className="form-control mt-3" placeholder="Article" aria-label="Article" aria-describedby="keyword"></input>
                </div>
              </div>
              <div className="input-group mb-3 search-bar">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
                <select className="form-select" id="inputGroupSelect01">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
