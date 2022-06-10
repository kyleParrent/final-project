import React from 'react';
import TopHeadings from './pages/top-headings';
import Navbar from './components/navbar';
import ArticleInfo from './pages/article-info';
import ReviewForm from './pages/review-form';
import ReviewInfo from './pages/review-info';
import SearchForm from './pages/search-form';
import Authorize from './pages/authorize';
import jwtDecode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const route = parseRoute(window.location.hash);
    this.state = {
      user: null,
      isAuthorizing: true,
      route,
      articles: [],
      currentArticleIndex: route.params.get('articleIndex')
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidUpdate(previousProps, previousState) {
    const currentRoute = this.state.route;
    const previousRoute = previousState.route;
    if (currentRoute === previousRoute) {
      return;
    }
    if (this.state.route.path === 'search-results') {
      const { route } = this.state;
      const queryString = route.params;
      const reqString = `https://gnews.io/api/v4/search?${queryString}&token=f485f1a41660631de98dd6421698b875`;
      fetch(reqString)
        .then(res => res.json())
        .then(result => {
          const articles = result.articles;
          this.setState({ articles });
        });
    }
    if (this.state.route.path === '') {
      fetch('https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=f485f1a41660631de98dd6421698b875')
        .then(res => res.json())
        .then(result => {
          const articles = result.articles;
          this.setState({ articles });
        });
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
    fetch('https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=f485f1a41660631de98dd6421698b875')
      .then(res => res.json())
      .then(result => {
        const articles = result.articles;
        this.setState({ articles });
      });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('app-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('app-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <TopHeadings articles={this.state.articles}/>;
    }
    if (route.path === 'info') {
      const articleIndex = route.params.get('articleIndex');
      const reviewArticleId = route.params.get('articleId');
      const articleData = this.state.articles[articleIndex];
      return <ArticleInfo article={articleData} articleIndex={articleIndex} reviewedArticleId={reviewArticleId}/>;
    }
    if (route.path === 'review') {
      const articleIndex = route.params.get('articleIndex');
      const articleData = this.state.articles[articleIndex];
      return <ReviewForm info={articleData} />;
    }
    if (route.path === 'user-reviews') {
      const userId = route.params.get('userId');
      return <ReviewInfo userId={userId}/>;
    }
    if (route.path === 'search') {
      return <SearchForm />;
    }
    if (route.path === 'search-results') {
      return <SearchForm articles={this.state.articles}/>;
    }
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return <Authorize />;
    }
  }

  render() {
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <div>
          <Navbar />
          <div className='container'>
            {this.renderPage()}
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
