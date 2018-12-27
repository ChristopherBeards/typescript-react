import * as React from 'react';
import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AdminPage = React.lazy(() => import('./AdminPage'));
import ProductPages from './ProductPages';
import ProductPage from './ProductPage';
import Header from './Header';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';

const RoutesWrap: React.SFC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

const Routes: React.SFC<RouteComponentProps> = props => {
  const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          timeout={500}
          classNames="animate"
        >
          <Switch>
            <Redirect exact={true} from="/" to="/products" />
            <Route path="/admin">
              {loggedIn ? (
                <Suspense
                  fallback={<div className="page-container"> Loading... </div>}
                >
                  <AdminPage />
                </Suspense>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/products/:id" component={ProductPage} />
            <Route exact={true} path="/products" component={ProductPages} />
            <Route exact={true} path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RoutesWrap;
