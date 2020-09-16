import React, {Component} from 'react';
import '@public/scss/style.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from "./routes";

import About from "@/containers/About";
import Home from "@/containers/Home";
import FrontLayout from "./hoc/FrontLayout";
import {Crumbs} from "./components/Crumbs";

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            {routes.map(({path, name, Component}, key) => (
              <Route
                exact
                path={path}
                key={key}
                render={props => {
                  const crumbs = routes
                    .filter(({path}) => props.match.path.includes(path))
                    .map(({path, ...rest}) => ({
                      path: Object.keys(props.match.params).length
                        ? Object.keys(props.match.params).reduce(
                          (path, param) =>
                            path.replace(`:${param}`,
                              props.match.params[param]),path )
                        : path,
                      ...rest
                    }));

                  return (
                    <div>
                      <Component {...props} crumb={crumbs} title={name} />
                    </div>
                  );
                }}
              />
            ))}
            {/*<Route exact path="/about/:id/:name" render={() => <FrontLayout/>}/>*/}
            {/*<Route exact path="/about" component={() => renderWithLayout(FrontLayout, About)} />*/}
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;


// import React, {Component} from 'react';
// import '@public/scss/style.scss';
// import {useRoutes} from "./routes";
// import {connect} from 'react-redux';
// import {BrowserRouter as Router} from 'react-router-dom';
//
// const routes = useRoutes();
//
// class App extends Component {
//
//   render() {
//     return (
//       <div>
//         <Router>
//           {routes}
//         </Router>
//       </div>
//     )
//   }
// }
//
//
//
// export default App;
