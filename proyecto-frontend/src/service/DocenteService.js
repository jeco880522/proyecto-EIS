import axios from 'axios';

export class DocenteService{
    baseUrl = "http://localhost:8080/";
    getAll(){
        return axios.get(this.baseUrl + "docentes").then(res => res.data);
    }
    existsById(id){
        return axios.get(this.baseUrl + "docenteExiste/"+id);
    }

    findById(id){
        return axios.get(this.baseUrl + "docentes/"+id).then(res => res.data);
    }
}