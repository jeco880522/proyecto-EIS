import React, { Component } from "react";
import "./App.css";
import { EstudianteService } from "./service/EstudianteService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/nova-alt/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class App extends Component {
  constructor() {
    super();
    this.Toast = React.createRef();
    this.state = {
      visible: false,
      estudiante: {
        id_est: "",
        identif_est: "",
        nombre_est: "",
        apellido_est: "",
        correo_institucional_est: "",
        telefono_est: "",
      },
      selectedEstudiante : {

      }
    };
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSaveDialog();
        },
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          this.showEditDialog();
          this.estudianteService.getAll().then((data) => {
            this.setState({ estudiantes: data });
            }
          );
        },
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          this.delete();
        },
      },
      {
        label: "Recargar",
        icon: "pi pi-fw pi-undo",
        command: () => {
          this.estudianteService.getAll().then((data) => {
            this.setState({ estudiantes: data });
          });
        },
      },
    ];
    this.estudianteService = new EstudianteService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount() {
    this.estudianteService.getAll().then((data) => {
      console.log(data);
      this.setState({ estudiantes: data });
    });
  }

  save() {
    this.estudianteService.save(this.state.estudiante).then((data) => {
      this.setState({
        visible: false,
        estudiante: {
          id_est: "",
          identif_est: "",
          nombre_est: "",
          apellido_est: "",
          correo_institucional_est: "",
          telefono_est: "",
        },
      });
    });
    this.Toast.current.show({
      severity: "success",
      summary: "Atención!",
      detail: "Se guardó el registro correctamente.",
    });
    this.estudianteService.getAll().then((data) => {
      this.setState({ estudiantes: data });
      }
    );
  }

  delete(){
    if(window.confirm("¿Realmente desea eliminar el registro?")){
      this.estudianteService.delete(this.state.selectedEstudiante.id_est).then(
        data => {
          this.Toast.current.show({
            severity: "success",
            summary: "Atención!",
            detail: "Se elimino el registro correctamente.",
          });
          this.estudianteService.getAll().then((data) => {
            this.setState({ estudiantes: data });
            }
          );
        }
      );
    }else{
      this.Toast.current.show({
        severity: "warn",
        summary: "Atención!",
        detail: "No se elimino el registro.",
      });
    }
  }

  render() {
    return (
      <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Estudiantes">
          <DataTable 
          value={this.state.estudiantes}
          paginator = {true}
          rows = "4"
          selectionMode="single" 
          selection = {this.state.selectedEstudiante}
          onSelectionChange={e => this.setState({selectedEstudiante: e.value})}>
            <Column field="id_est" header="ID"></Column>
            <Column field="identif_est" header="Identificacion"></Column>
            <Column field="nombre_est" header="Nombre"></Column>
            <Column field="apellido_est" header="Apellido"></Column>
            <Column
              field="correo_institucional_est"
              header="Correo Consitucional"
            ></Column>
            <Column field="telefono_est" header="Telefono"></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Informacion Estudiante"
          visible={this.state.visible}
          style={{ width: "400px" }}
          footer={this.footer}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <br />
          <br />
          <form id="form-est">
            <span className="p-float-label">
              <InputText
                style={{ width: "100%" }}
                value={this.state.estudiante.identif_est}
                id="identif_est"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let estudiante = Object.assign({}, prevState.estudiante);
                    estudiante.identif_est = val;
                    return { estudiante };
                  });
                }}
              />
              <label htmlFor="identif_est">Identificacion</label>
            </span>
            <br />
            <br />
            <span className="p-float-label">
              <InputText
                style={{ width: "100%" }}
                value={this.state.estudiante.nombre_est}
                id="nombre_est"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let estudiante = Object.assign({}, prevState.estudiante);
                    estudiante.nombre_est = val;
                    return { estudiante };
                  });
                }}
              />
              <label htmlFor="nombre_est">Nombres</label>
            </span>
            <br />
            <br />
            <span className="p-float-label">
              <InputText
                style={{ width: "100%" }}
                value={this.state.estudiante.apellido_est}
                id="apellido_est"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let estudiante = Object.assign({}, prevState.estudiante);
                    estudiante.apellido_est = val;
                    return { estudiante };
                  });
                }}
              />
              <label htmlFor="apellido_est">Apellidos</label>
            </span>
            <br />
            <br />
            <span className="p-float-label">
              <InputText
                style={{ width: "100%" }}
                value={this.state.estudiante.correo_institucional_est}
                id="correo_institucional_est"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let estudiante = Object.assign({}, prevState.estudiante);
                    estudiante.correo_institucional_est = val;
                    return { estudiante };
                  });
                }}
              />
              <label htmlFor="correo_institucional_est">
                Correo Institucional
              </label>
            </span>
            <br />
            <br />
            <span className="p-float-label">
              <InputText
                style={{ width: "100%" }}
                value={this.state.estudiante.telefono_est}
                id="telefono_est"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let estudiante = Object.assign({}, prevState.estudiante);
                    estudiante.telefono_est = val;
                    return { estudiante };
                  });
                }}
              />
              <label htmlFor="telefono_est">Telefono</label>
            </span>
          </form>
        </Dialog>
        <Toast ref={this.Toast} />
      </div>
    );
  }
  showSaveDialog() {
    this.setState({
      visible: true,
      estudiante: {
        id_est: "",
        identif_est: "",
        nombre_est: "",
        apellido_est: "",
        correo_institucional_est: "",
        telefono_est: "",
      },
    });
  }
  showEditDialog(){
    this.setState({
      visible: true,
      estudiante: {
        id_est: this.state.selectedEstudiante.id_est,
        identif_est: this.state.selectedEstudiante.identif_est,
        nombre_est: this.state.selectedEstudiante.nombre_est,
        apellido_est: this.state.selectedEstudiante.apellido_est,
        correo_institucional_est: this.state.selectedEstudiante.correo_institucional_est,
        telefono_est: this.state.selectedEstudiante.telefono_est,
      },
    });
  }
}
