import React from "react";
import root from ".";
import Home from "./Home";
import { EstudianteService } from "./service/EstudianteService";
import { ProyectoService } from "./service/ProyectoService";
import { DocenteService } from "./service/DocenteService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/nova-alt/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

export default class AsignarPro extends React.Component {
    constructor(props) {
        super(props);
        this.Toast = React.createRef();
        this.state = {
            proyectos: '',
            visible: false,
            proyecto:{
                id_pro: '',
                nombre_pro: '',
                fecha_limite: '',
                archivo_pro: '',
                estado_pro: '',
                retroalimentacion_pro: '',
                estudiante: '',
                docente: ''
            },
            id_est: '',
            identif_doc: '',
            docentes: [],
            estudiantes: [],
            selectedProyecto : {
            },

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
                this.proyectoService.findAllProyect().then((res) => {
                this.setState( { proyectos: res }); });
              },
            },
            {
              label: "Recargar",
              icon: "pi pi-fw pi-undo",
              command: () => {
                this.proyectoService.findAllProyect().then((res) => {
                this.setState( { proyectos: res }); });
              },
            },
            {
                label: "Home",
                icon: "pi pi-fw pi-home",
                command: () =>{
                  this.props.history.push("/home");
                  root.render(<Home history = {this.props.history}/>);
                }
            }
        ];
        
        this.docenteService = new DocenteService();
        this.estudianteService = new EstudianteService();
        this.proyectoService = new ProyectoService();
        this.save = this.save.bind(this);
        this.footer = (
            <div>
              <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
        );
    }

    componentDidMount() {
        this.proyectoService.findAllProyect().then((res) => {
            console.log(res);
            this.setState( { proyectos: res }); });
        this.docenteService.getAll().then((res) => {
            this.setState({ docentes: res, }); });
        this.estudianteService.getAll().then((res) => {
            this.setState({ estudiantes: res, }); });
    }

    obtenerDocente( identif_doc ){
        for (let index = 0; index < this.state.docentes.length; index++) {
            if(this.state.docentes[index].identif_doc == identif_doc){
                return this.state.docentes[index];
            }
        }
    }
    obtenerEstudiante( id_est ){
        for (let index = 0; index < this.state.estudiantes.length; index++) {
            if(this.state.estudiantes[index].id_est == id_est){
                return this.state.estudiantes[index];
            }
        }
    }

    save() {
        console.log(this.state.proyecto);
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
    }
    

    render() {
        return (
            <div style={{ width: "95%", margin: "0 auto", marginTop: "20px" }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Proyectos de Opcion de Grado">
                    <DataTable 
                        value={this.state.proyectos}
                        paginator = {true}
                        rows = "4"
                        selectionMode="single"
                        selection = {this.state.selectedProyecto}
                        onSelectionChange={e => this.setState({selectedProyecto: e.value})}>
                            <Column field="id_pro" header="ID"></Column>
                            <Column field="docente.nombre_doc" header="Nombres Docente"></Column>
                            <Column field="docente.apellido_doc" header="Apellidos Docente"></Column>
                            <Column field="nombre_pro" header="Titulo del Proyecto Asignado"></Column>
                            <Column field="estudiante.nombre_est" header="Nombres Alumno"></Column>
                            <Column field="estudiante.apellido_est" header="Apellidos Alumno"></Column>
                            <Column field="fecha_limite" header="Fecha Limite para Evaluar"></Column>
                            <Column field="estado_pro" header="Estado (Aprobado/No Aprobado)"></Column>
                            <Column field="retroalimentacion_pro" header="Retroalimentación"></Column>
                    </DataTable>
                </Panel>
                <Dialog
                    header="Informacion del Proyecto"
                    visible={this.state.visible}
                    style={{ width: "400px" }}
                    footer={this.footer}
                    modal={true}
                    onHide={() => this.setState({ visible: false })}
                >
                    <br />
                    <br />
                    <form id="form-pro">
                        <span className="p-float-label">
                            <InputText
                                style={{ width: "100%" }}
                                value={this.state.identif_doc}
                                id="identif_doc"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState({
                                        identif_doc: val,
                                    })
                                    this.setState((prevState) => {
                                        let proyecto = Object.assign({}, prevState.proyecto);
                                        proyecto.docente = this.obtenerDocente(val);;
                                        return { proyecto };
                                    });
                                }}
                            />
                            <label htmlFor="identif_doc">Identificacion Docente</label>
                        </span>
                        <br />
                        <br />
                        <span className="p-float-label">
                            <InputText
                                style={{ width: "100%" }}
                                value={this.state.id_est}
                                id="id_est"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState({
                                        id_est: val
                                    });
                                    this.setState((prevState) => {
                                        let proyecto = Object.assign({}, prevState.proyecto);
                                        proyecto.estudiante = this.obtenerEstudiante(val);;
                                        return { proyecto };
                                    });
                                }}
                            />
                            <label htmlFor="id_est">Codigo Estudiante</label>
                        </span>
                        <br />
                        <br />
                        <span className="p-float-label">
                            <InputText
                                style={{ width: "100%" }}
                                value={this.state.proyecto.nombre_pro}
                                id="nombre_pro"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState((prevState) => {
                                        let proyecto = Object.assign({}, prevState.proyecto);
                                        proyecto.nombre_pro = val;
                                        return { proyecto };
                                    });
                                }}
                            />
                            <label htmlFor="nombre_pro">Nombre del Proyecto</label>
                        </span>
                        <br />
                        <br />
                        <span className="p-float-label">
                            <InputText
                                style={{ width: "100%" }}
                                value={this.state.proyecto.fecha_limite}
                                id="fecha_limite"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState((prevState) => {
                                        let proyecto = Object.assign({}, prevState.proyecto);
                                        proyecto.fecha_limite = val;
                                        return { proyecto };
                                    });
                                }}
                            />        
                            <label htmlFor="fecha_limite">
                              Fecha Limite
                            </label>
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
            proyecto: {
                id_pro: '',
                nombre_pro: '',
                fecha_limite: '',
                archivo_pro: '',
                estado_pro: '',
                retroalimentacion_pro: '',
                estudiante: '',
                docente: '',
            },
            identif_est: '',
            identif_doc: '',
        });
    }

    showEditDialog(){
        this.setState({
            visible: true,
            proyecto: {
                id_pro: this.state.selectedProyecto.id_pro,
                nombre_pro: this.state.selectedProyecto.nombre_pro,
                fecha_limite: this.state.selectedProyecto.fecha_limite,
                estado_pro: this.state.selectedProyecto.estado_pro,
                retroalimentacion_pro: this.state.selectedProyecto.retroalimentacion_pro,
                archivo_pro: this.state.selectedProyecto.archivo_pro,
                estudiante: this.state.selectedProyecto.estudiante,
                docente: this.state.selectedProyecto.docente
            },
        });
    }
}