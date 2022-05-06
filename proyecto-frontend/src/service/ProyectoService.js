import axios from 'axios';

export class ProyectoService{
    baseUrl = "http://localhost:8080/";

    getProyectDocent(id){
        return axios.get(this.baseUrl + "proyectosDocente/"+id).then(res => res.data);
    }
    save(proyecto){
        return axios.post(this.baseUrl + "proyectos", proyecto).then(res => res.data);
    }

    findAllProyect(){
        return axios.get(this.baseUrl + "proyectos").then(res => res.data);
    }
}