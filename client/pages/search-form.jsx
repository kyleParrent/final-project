import React from 'react';
import Article from '../components/article';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      language: '',
      country: ''
    };
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeLanguage(event) {
    this.setState({ language: event.target.value });
  }

  handleChangeCountry(event) {
    this.setState({ country: event.target.value });
  }

  handleChangeKeyword(event) {
    this.setState({ keywords: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const keyArray = this.state.keywords.split(' ');
    const searchParams = new URLSearchParams();
    if (this.state.language !== '') {
      searchParams.set('lang', this.state.language);
    }
    if (this.state.country !== '') {
      searchParams.set('country', this.state.country);
    }
    keyArray.forEach(keyword => {
      searchParams.append('q', keyword);
    });
    const queryString = searchParams.toString();
    window.location.hash = `search-results?${queryString}`;
  }

  render() {
    let result = null;
    if (this.props.articles) {
      if (this.props.articles.length === 0) {
        result = (
          <div className="row justify-content-center">
            <div className='d-flex justify-content-center align-items-center mt-4'>
              <h2>Results</h2>
            </div>
            <div className="col-5 bg-white border border-2 border-dark m-2">
              <div className='d-flex justify-content-center'>
                <h3 className='m-2'>Nothing Found</h3>
              </div>
            </div>
          </div>
        );
      } else {
        result = (
          <div className="row justify-content-center">
            <div className='d-flex justify-content-center align-items-center mt-4'>
              <h2>Results</h2>
            </div>
            {
              this.props.articles.map((article, index) => {
                return <Article key={index} article={article} index={index} />;
              })
            }
          </div>
        );
      }
    }
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <div className='search-container'>
            <form onSubmit={this.handleSubmit}>
              <div>
                <div className='mt-5 bg-secondary form-box-top border-top border-end border-start border-2 border-dark d-flex justify-content-center'>
                  <div className="input-group mb-3 mt-4 search-bar border border-1 border-dark rounded-2">
                    <span className="input-group-text" id="keyword">Keywords</span>
                    <input onChange={this.handleChangeKeyword} type="text" className="form-control" placeholder="Article" aria-label="Article" aria-describedby="keyword" required></input>
                  </div>
                </div>
                <div className='bg-secondary d-flex justify-content-center border-end border-start border-2 border-dark'>
                  <div className="input-group mb-3 search-bar border border-1 border-dark rounded-2">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Language</label>
                    <select onChange={this.handleChangeLanguage} className="form-select" id="inputGroupSelect01">
                      <option value="">--- Optional ---</option>
                      <option value="ar">Arabic</option>
                      <option value="de">German</option>
                      <option value="el">Greek</option>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="he">Hebrew</option>
                      <option value="hi">Hindi</option>
                      <option value="it">Italian</option>
                      <option value="ja">Japanese</option>
                      <option value="ml">Malayalam</option>
                      <option value="mr">Marathi</option>
                      <option value="nl">Dutch</option>
                      <option value="no">Norwegian</option>
                      <option value="pt">Portuguese</option>
                      <option value="ro">Romanian</option>
                      <option value="ru">Russian</option>
                      <option value="sv">Swedish</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                      <option value="uk">Ukrainian</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                </div>
                <div className='bg-secondary d-flex justify-content-center border-end border-start border-2 border-dark'>
                  <div className="input-group mb-2 search-bar border border-1 border-dark rounded-2">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Country</label>
                    <select onChange={this.handleChangeCountry} className="form-select" id="inputGroupSelect01">
                      <option value="">--- Optional ---</option>
                      <option value="au">Australia</option>
                      <option value="br">Brazil</option>
                      <option value="ca">Canada</option>
                      <option value="ch">Switzerland</option>
                      <option value="cn">China</option>
                      <option value="de">Germany</option>
                      <option value="eg">Egypt</option>
                      <option value="es">Spain</option>
                      <option value="fr">France</option>
                      <option value="gb">United Kingdom</option>
                      <option value="gr">Greece</option>
                      <option value="hk">Hong Kong</option>
                      <option value="ie">Ireland</option>
                      <option value="il">Israel</option>
                      <option value="in">India</option>
                      <option value="it">Italy</option>
                      <option value="jp">Japan</option>
                      <option value="nl">Netherlands</option>
                      <option value="no">Norway</option>
                      <option value="pe">Peru</option>
                      <option value="ph">Philippines</option>
                      <option value="pk">Pakistan</option>
                      <option value="pt">Portugal</option>
                      <option value="ro">Romania</option>
                      <option value="ru">Russian Federation</option>
                      <option value="se">Sweden</option>
                      <option value="sg">Singapore</option>
                      <option value="tw">Taiwan</option>
                      <option value="ua">Ukraine</option>
                      <option value="us">United States</option>
                    </select>
                  </div>
                </div>
                <div className='form-box-bottom bg-secondary d-flex justify-content-center border-bottom border-end border-start border-2 border-dark'>
                  <div className='d-flex justify-content-end search-bar'>
                    <button className='btn btn-dark mb-2 btn-sm' type='submit'>SEARCH</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='block'>
          {
            result
          }
        </div>
      </div>

    );
  }
}
