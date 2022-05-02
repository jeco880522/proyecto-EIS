import axios from 'axios';

export class ProyectoService{
    baseUrl = "http://localhost:8080/";

    getProyectDocent(id){
        return axios.get(this.baseUrl + "proyectosDocente/"+id).then(res => res.data);
    }
}