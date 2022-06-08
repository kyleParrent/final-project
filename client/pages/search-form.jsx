import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      language: '',
      country: '',
      articles: null
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
    let lang = '&lang=';
    let country = '&country=';
    let keyString = '';
    const keyArray = this.state.keywords.split(' ');
    keyArray.map(keyword => {
      if (keyword === keyArray[0]) {
        keyString += `q=${keyword}`;
        return keyString;
      } else {
        keyString += `&q=${keyword}`;
        return keyString;
      }
    });
    if (this.state.language !== '') {
      lang += this.state.language;
    } else {
      lang = '';
    }
    if (this.state.country !== '') {
      country += this.state.country;
    } else {
      country = '';
    }
    const reqString = `https://gnews.io/api/v4/search?${keyString}${lang}${country}&token=db7ace67a38e6b5a80d8e73290798c87`;
    fetch(reqString)
      .then(res => res.json())
      .then(result => {
        const articles = result.articles;
        this.setState({ articles });
      });
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
                  <span className="input-group-text mt-3" id="keyword">Keywords</span>
                  <input onChange={this.handleChangeKeyword} type="text" className="form-control mt-3" placeholder="Article" aria-label="Article" aria-describedby="keyword" required></input>
                </div>
              </div>
              <div className='d-flex justify-content-center border-end border-start border-2 border-dark'>
                <div className="input-group mb-3 search-bar">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Language</label>
                  <select onChange={this.handleChangeLanguage} className="form-select" id="inputGroupSelect01">
                    <option selected>-- Optional --</option>
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
              <div className='d-flex justify-content-center border-end border-start border-2 border-dark'>
                <div className="input-group mb-3 search-bar">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Country</label>
                  <select onChange={this.handleChangeCountry} className="form-select" id="inputGroupSelect01">
                    <option selected>-- Optional --</option>
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
              <div className='d-flex justify-content-center border-bottom border-end border-start border-2 border-dark'>
                <div className='d-flex justify-content-end search-bar'>
                  <button className='btn btn-dark mb-2' type='submit'>SUBMIT</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
