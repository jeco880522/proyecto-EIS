import axios from 'axios';

export class EstudianteService{
    baseUrl = "http://localhost:8080/";
    getAll(){
        return axios.get(this.baseUrl + "estudiantes").then(res => res.data);
    }

    save(estudiante){
        return axios.post(this.baseUrl + "estudiantes", estudiante).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl + "estudiantes/"+id).then(res => res.data);
    }
}