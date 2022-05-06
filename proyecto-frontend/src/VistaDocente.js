import { InputText } from "primereact/inputtext";
import React, { Component } from "react";
import { DocenteService } from "./service/DocenteService";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import EvaluarPro from "./EvaluarPro";
import root from ".";

import "primereact/resources/themes/nova-alt/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class VistaDocente extends Component {
  constructor(props) {
    super(props);
    this.Toast = React.createRef();
    this.state = {
      identif_doc_busq: "",
    };
    this.docenteService = new DocenteService();
  }
  componentDidMount() {
    this.docenteService.getAll().then((data) => {
      this.setState({ docente: data });
    });
  }

  handleChangeIdentif_doc = (event) => {
    this.setState({ identif_doc_busq: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.docenteService.existsById(this.state.identif_doc_busq).then((res)=>{
      if(res.data==true){
        this.Toast.current.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se encontro el docente.",
        });
        this.props.history.push("/evaluarpro");
        root.render(<EvaluarPro identif_doc = {this.state.identif_doc_busq} history = {this.props.history}/>);
      } else {
        this.Toast.current.show({
          severity: "warn",
          summary: "Atención!",
          detail: "Docente no encontrado.",
        });
      }
    });
  };

  render() {
    return (
      <div
        onSubmit={this.handleSubmit}
        style={{ width: "40%", margin: "0 auto", marginTop: "50px" }}
      >
        <Panel header="Docentes">
          <br />
          <form>
            <span className="p-float-label">
              <InputText
                name="identif_doc"
                onChange={this.handleChangeIdentif_doc}
                type="text"
              />
              <label>Identificacion</label>
            </span>
            <br />
            <Button 
            type="submit" 
            label="Ingresar" 
            icon="pi pi-check" 
            />
          </form>
        </Panel>
        <Toast ref={this.Toast} />
      </div>
    );
  }
}
