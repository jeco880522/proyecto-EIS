import { Component } from "react";
import { Button } from 'primereact/button';
import { Panel } from "primereact/panel";
import VistaDocente from "./VistaDocente";
import root from ".";

import "primereact/resources/themes/nova-alt/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AsignarPro from "./AsignarPro";

export default class Home extends Component{
    constructor(props) {
        super(props);
    }
    asignar = () =>{
        this.props.history.push("/evaluarpro");
        root.render(<AsignarPro history = {this.props.history}/>);
    }
    evaluar = () => {
        this.props.history.push("/docente");
        root.render(<VistaDocente history = {this.props.history}/>);
    }
    render() {
        return (
            <div style={{ width: "45%", margin: "0 auto", marginTop: "50px"}}>
                <Panel header="Gestion Evalución Docente">
                    <Button 
                        label="Asignar Proyectos"  
                        className="p-button-rounded p-button-primary p-button-lg" 
                        aria-label="Bookmark"
                        onClick={this.asignar}
                        style={{marginRight: "25px", backgroundColor: "green"}}/>
                    <Button 
                        label="Evaluar Proyectos"
                        onClick={this.evaluar}
                        className="p-button-rounded p-button-succes p-button-lg" />
                    </Panel>
            </div>
        );
    }
}