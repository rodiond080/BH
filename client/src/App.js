import React, {Component} from 'react';
import '@public/scss/style.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from "./routes";



class App extends Component {

  componentDidMount() {
    String.prototype.translit = String.prototype.translit || function () {
      var Chars = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA'
        },
        t = this;
      for (var i in Chars) { t = t.replace(new RegExp(i, 'g'), Chars[i]); }
      return t;
    };
    File.prototype.readFileAsync = File.prototype.readFileAsync || function readFileAsync() {
      const file = this;
      return new Promise((res, rej) => {
        let reader = new FileReader();
        reader.onload = () => {
          res(reader.result);
        }
        reader.onerror = rej;
        reader.readAsDataURL(file);
      })
    }
  }

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
                    .filter(({path}) => {
                       return  props.match.path.includes(path)
                      })
                    .map(({path, ...rest}) => ({
                      path: Object.keys(props.match.params).length
                        ? Object.keys(props.match.params).reduce(
                          (path, param) =>
                            path.replace(`:${param}`,
                              props.match.params[param]),path )
                        : path,
                      ...rest
                    }));

                  // console.log(crumbs);

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

// function readFileAsync(file) {
//   return new Promise((res, rej) => {
//     let reader = new FileReader();
//     reader.onload = () => {
//       res(reader.result);
//     }
//     reader.onerror = rej;
//     reader.readAsDataURL(file);
//   });
// }
