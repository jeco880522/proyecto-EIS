import React from "react";
import root from ".";
import Home from "./Home";
import { EstudianteService } from "./service/EstudianteService";
import { ProyectoService } from "./service/ProyectoService";
import { Button } from "primereact/button";
import { DocenteService } from "./service/DocenteService";
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

export default class AsignarPro extends React.Component {
    constructor(props) {
        super(props);
        this.Toast = React.createRef();
        this.state = {
            proyectos: '',
            visible: false,
            proyecto:{
                id_pro: "",
                nombre_pro: '',
                fecha_limite: '',
                archivo_pro: '',
                estado_pro: '',
                retroalimentacion_pro: '',
                estudiante: '',
                docente: ''
            },
            identif_est: '',
            identif_doc: '',
            docente:'',
            estudiante:'',
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
          this.setState( { proyectos: res }); });
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
        this.proyectoService.findAllProyect().then((res) => {
            this.setState( { proyectos: res }); });
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
                                value={this.state.identif_est}
                                id="identif_est"
                                onChange={(e) => {
                                  let val = e.target.value;
                                  this.docenteService.findById(val).then((res) => {
                                    if(res.identif_doc == val){
                                        this.setState({docente: res});
                                    } else {
                                        this.Toast.current.show({
                                            severity: "warn",
                                            summary: "Atención!",
                                            detail: "El estudiante no existe.",
                                        });
                                    }
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
                                value={this.state.estudiante.id_est}
                                id="id_est"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.estudianteService.findById(val).then((res) => {
                                        if(res.id_est == val){
                                            this.setState({estudiante: res});
                                        } else {
                                            this.Toast.current.show({
                                                severity: "warn",
                                                summary: "Atención!",
                                                detail: "El estudiante no existe.",
                                            });
                                        }
                                    });
                                    // this.setState((prevState) => {
                                    //     let estudiante = Object.assign({}, prevState.estudiante);
                                    //     this.estudianteService.findById(val).then((res) => {
                                    //         estudiante = res;
                                    //     })
                                    //     return { estudiante };
                                    // });
                                }}
                            />
                            <label htmlFor="id_est">Codigo Estudiante</label>
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
        )
    }
}