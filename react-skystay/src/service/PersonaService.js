import axios from 'axios';
import res from 'express/lib/response';

export class PersonaService{
    baseUrl = "http://localhost:8080/api/clientes/apellido1/reservas";
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data.data);
    }
}