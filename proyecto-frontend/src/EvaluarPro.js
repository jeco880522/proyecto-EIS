import {ProyectoService} from "./service/ProyectoService";
import React, { Component } from "react";
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

export default class EvaluarPro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          proyectos: [],
          arrayProTable: [],
          proyecto: {
            id_pro: '',
            nombre_pro: '',
            fecha_limite: '',
            archivo_pro: '',
            estado_pro: '',
            retroalimentacion_pro: '',
            id_est_fk: '',
            identif_doc_fk: ''
          },
          estudiantes: [],
          docentes: [],
          identif_doc_busq: '',
        };
        this.proyectoService = new ProyectoService();
        this.jsonTable = this.jsonTable.bind(this);
      }
      
      componentDidMount() {
        this.proyectoService.getProyectDocent(this.props.identif_doc).then((res) => {
          this.setState( { 
            proyectos: res
          });
        }); 
        this.jsonTable();
      }

      jsonTable(){
        this.state.proyectos.map( (i) => {
          this.setState({
            proyecto: {
              id_pro: i.id_pro,
              nombre_pro: i.nombre_pro,
              fecha_limite: i.fecha_limite,
              archivo_pro: i.archivo_pro,
              estado_pro: i.estado_pro,
              retroalimentacion_pro: i.retroalimentacion_pro
            }
          });
          this.state.estudiantes.push(i.estudiante);
          this.state.docentes.push(i.docente);
          this.state.arrayProTable.push(this.state.proyecto)
          this.setState({
            proyecto: {
              id_pro: '',
              nombre_pro: '',
              fecha_limite: '',
              archivo_pro: '',
              estado_pro: '',
              retroalimentacion_pro: ''
            }
          });
        });
        console.log(this.state.estudiantes);
        console.log(this.state.docentes);
        console.log(this.state.arrayProTable);
      }

      

      render() {
        return (
          console.log(this.state.proyectos),
            <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
              <li>{this.props.identif_doc}</li>
              <Panel header="Proyectos">
                <DataTable 
                  value={this.state.arrayProTable}
                  paginator = {true}
                  rows = "4"
                  selectionMode="single">
                </DataTable>
                  <Column field="id_pro" header="ID"></Column>
                  <Column field="nombre_pro" header="Titulo del Proyecto"></Column>
                   <Column field="fecha_limite" header="Fecha Limite para Evaluar"></Column>
                  <Column field="estado_pro" header="Estado"></Column>
                </Panel>
            </div>
        );
    }
}