import React from 'react';
import TopHeadings from './pages/top-headings';
import Navbar from './components/navbar';
import ArticleInfo from './pages/article-info';
import 'bootstrap/dist/css/bootstrap.min.css';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      articles: null
    };
    this.setArticles = this.setArticles.bind(this);
  }

  setArticles(articles) {
    this.setState({ articles });
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
  }

  renderPage() {
    const { route } = this.state;
    const articleId = route.params.get('articleId');
    if (route.path === '') {
      return <TopHeadings />;
    }
    if (route.path === 'info') {
      const articleData = this.state.articles[articleId];
      return <ArticleInfo article={articleData} />;
    }
  }

  render() {
    const contextValue = { setArticles: this.setArticles };
    return (
      <AppContext.Provider value={contextValue}>
        <div>
          <Navbar />;
          <div className='container'>
            {this.renderPage()}
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
