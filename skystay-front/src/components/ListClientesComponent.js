import React, {useEffect, useState} from 'react'
import ClienteService from '../services/ClienteService';
import { response } from 'express';

export const ListClientesComponent = () =>
{
    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        ClienteService.getAllClientes().then(response => {
            setClientes(response.data);
            console.log(response.data);

        }).catch(error =>{
            console.log(error);

        })
    },[])
    return (
        <div className='container'>
            <h2 className='text-center'> Lista de clientes</h2 >
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                </thead>
                <tbody>
                    {
                        clientes.map(
                            cliente =>
                                <tr key={cliente.id}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.apellido}</td>
                                    <td>{cliente.email}</td>
                                </tr>
                        )
                    }
 
                </tbody>
             </table>
        </div>
    )
}

export default ListClientesComponent;