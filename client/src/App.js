import React, {Component} from 'react';
import '@public/scss/style.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from "./routes";
// import FrontLayout from "@/hoc/FrontLayout";
// import About from "@/containers/About";
// import Home from "@/containers/Home";


class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            {/*{*/}
            {/*  routes.map(({path, name, Component}, key)=>(*/}
            {/*    <Route exact path={path} key={key}*/}
            {/*      render={(props)=> {*/}
            {/*        console.log(props)*/}
            {/*        const crumbs = routes*/}
            {/*          .filter(({path}) => props.match.path.includes(path))*/}
            {/*        ;*/}

            {/*        console.log(crumbs)*/}
            {/*        return <Component />*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  ))*/}
            {/*}*/}

            {/*<Route exact path="/" render={() => renderWithLayout(FrontLayout, Home)} />*/}
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
