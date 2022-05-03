import {ProyectoService} from "./service/ProyectoService";
import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/nova-alt/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class EvaluarPro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          proyectos: '',
          proyecto: {
            id_pro: '',
            nombre_pro: '',
            fecha_limite: '',
            archivo_pro: '',
            estado_pro: '',
            retroalimentacion_pro: '',
            estudiante: '',
            docente: ''
          },
          identif_doc_busq: '',
          selectedProyecto : {
          },
        };

        this.Toast = React.createRef();

        this.items = [
          {
            label: "Editar",
            icon: "pi pi-fw pi-pencil",
            command: () => {
              this.showEditDialog();
              this.proyectoService.getProyectDocent(this.props.identif_doc).then((res) => {
              this.setState( { proyectos: res }); 
              });
            },
          },
          {
            label: "Recargar",
            icon: "pi pi-fw pi-undo",
            command: () => {
              this.proyectoService.getProyectDocent(this.props.identif_doc).then((res) => {
              this.setState( { proyectos: res }); 
              });
            },
          },
        ];

      this.proyectoService = new ProyectoService();

      this.save = this.save.bind(this);

      this.footer = (
        <div>
          <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
        </div>
      );
      
      }
      
      componentDidMount() {
        this.proyectoService.getProyectDocent(this.props.identif_doc).then((res) => {
          this.setState( { 
            proyectos: res
          });
        });
      }

      save() {
        this.proyectoService.save(this.state.proyecto).then((data) => {
          this.setState({
            visible: false,
            proyecto: {
                id_pro: '',
                nombre_pro: '',
                fecha_limite: '',
                archivo_pro: '',
                estado_pro: '',
                retroalimentacion_pro: '',
                estudiante: '',
                docente: ''
              }
          });
        });
        this.Toast.current.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se actualizó el registro correctamente.",
        });
        this.proyectoService.getProyectDocent(this.props.identif_doc).then((res) => {
         this.setState( { proyectos: res }); 
        });
      }

      render() {
        return (
            <div style={{ width: "95%", margin: "0 auto", marginTop: "20px" }}>
              <Menubar model={this.items} />
              <br />
              <Panel header="Evaluación de proyectos">
                <DataTable 
                  value={this.state.proyectos}
                  paginator = {true}
                  rows = "4"
                  selectionMode="single"
                  selection = {this.state.selectedProyecto}
                  onSelectionChange={e => this.setState({selectedProyecto: e.value})}>
                    <Column field="id_pro" header="ID"></Column>
                    <Column field="estudiante.nombre_est" header="Nombres"></Column>
                    <Column field="estudiante.apellido_est" header="Apellidos"></Column>
                    <Column field="nombre_pro" header="Titulo del Proyecto"></Column>
                    <Column field="fecha_limite" header="Fecha Limite para Evaluar"></Column>
                    <Column field="estado_pro" header="Estado (Aprobado/No Aprobado)"></Column>
                    <Column field="retroalimentacion_pro" header="Retroalimentación"></Column>
                </DataTable>
              </Panel>
              <Dialog
                header="Informacion de la Evaluación"
                visible={this.state.visible}
                style={{ width: "400px" }}
                footer={this.footer}
                modal={true}
                onHide={() => this.setState({ visible: false })}
              >
                <br />
                <br />
                <form id="form-doc">
                  <span className="p-float-label">
                    <InputText
                      style={{ width: "100%" }}
                      value={this.state.proyecto.estado_pro}
                      id="estado_pro"
                      onChange={(e) => {
                        let val = e.target.value;
                        this.setState((prevState) => {
                          let proyecto = Object.assign({}, prevState.proyecto);
                          proyecto.estado_pro = val;
                          return { proyecto };
                        });
                      }}
                  />
                  <label htmlFor="estado_pro">Estado</label>
                  </span>
                  <br />
                  <br />
                  <span className="p-float-label">
                    <InputTextarea
                      rows={5} 
                      cols={30}
                      value={this.state.proyecto.retroalimentacion_pro}
                      id="retroalimentacion_pro"
                      onChange={(e) => {
                        let val = e.target.value;
                        this.setState((prevState) => {
                          let proyecto= Object.assign({}, prevState.proyecto);
                          proyecto.retroalimentacion_pro = val;
                          return { proyecto };
                        });
                      }}
                    />
                    <label htmlFor="retroalimentacion_pro">Retroalimentación</label>
                  </span>
                </form>
              </Dialog>
              <Toast ref={this.Toast} />
            </div>
        );
    }
    showEditDialog(){
      this.setState({
        visible: true,
        proyecto: {
          id_pro: this.state.selectedProyecto.id_pro,
          nombre_pro: this.state.selectedProyecto.nombre_pro,
          fecha_limite: this.state.selectedProyecto.fecha_limite,
          archivo_pro: this.state.selectedProyecto.archivo_pro,
          estado_pro: this.state.selectedProyecto.estado_pro,
          retroalimentacion_pro: this.state.selectedProyecto.retroalimentacion_pro,
          estudiante: this.state.selectedProyecto.estudiante,
          docente: this.state.selectedProyecto.docente
        },
      });
    }
}