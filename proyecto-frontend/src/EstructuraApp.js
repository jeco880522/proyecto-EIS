import VistaDocente from "./VistaDocente";
import EvaluarPro from "./EvaluarPro";
import Home from "./Home"
import AsignarPro from "./AsignarPro";
import { Component } from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

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
                <Route exact path="/" element={<Home history={history}/>} />
                <Route exact path="/Home" element={<Home history={history}/>} />
                <Route exact path="/docente" element={<VistaDocente history={history}/>} />
                <Route exact path="/evaluarpro" element={<EvaluarPro history={history}/>} />
                <Route exact path="/asignarpro" element={<AsignarPro history={history}/>} />
                <Route render={() => <h1>Not found!</h1>} />
              </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
