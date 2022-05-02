import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import VistaDocente from "./VistaDocente";
import EvaluarPro from "./EvaluarPro";
import { Component } from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default class EstructuraApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Routes>
                <Route exact path="/" element={<VistaDocente history={history}/>} />
                <Route exact path="/docente" element={<VistaDocente history={history}/>} />
                <Route exact path="/evaluarpro" element={<EvaluarPro />} />
                <Route render={() => <h1>Not found!</h1>} />
              </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
