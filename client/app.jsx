import React from 'react';
import TopHeadings from './pages/top-headings';
import Navbar from './components/navbar';
import ArticleInfo from './pages/article-info';
import ReviewForm from './pages/review-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const route = parseRoute(window.location.hash);
    this.state = {
      route,
      articles: [],
      currentArticleIndex: route.params.get('articleIndex')
    };
  }

  componentDidUpdate(previousProps, previousState) {
    const currentRoute = this.state.route;
    const previousRoute = previousState.route;
    if (currentRoute === previousRoute) {
      return;

    }
    this.setState({ currentArticleIndex: this.state.route.params.get('articleIndex') });
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
    fetch('https://gnews.io/api/v4/top-headlines?lang=en&token=db7ace67a38e6b5a80d8e73290798c87')
      .then(res => res.json())
      .then(result => {
        const articles = result.articles;
        this.setState({ articles });
      });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <TopHeadings articles={this.state.articles}/>;
    }
    if (route.path === 'info') {
      const articleIndex = route.params.get('articleIndex');
      const articleData = this.state.articles[articleIndex];
      return <ArticleInfo article={articleData} articleIndex={articleIndex}/>;
    }
    if (route.path === 'review') {
      const articleIndex = route.params.get('articleIndex');
      const articleData = this.state.articles[articleIndex];
      return <ReviewForm info={articleData} />;
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
