import {useEffect, useState} from 'react';
import {IRestaurante} from '../../../interfaces/IRestaurante';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const AdminRestaurantes = () =>  {

  // Busca restaurante na api na url pora adm (sem paginação)
  useEffect(() => {
    axios.get <IRestaurante[]> ('http://localhost:7000/api/v2/restaurantes/')
      .then(response =>
        setRestaurantes(response.data)
      );
  }, []);

  const [restaurantes, setRestaurantes] = useState <IRestaurante[]> ([]);

  return(
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            Nome
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => // Gera uma linha para cada restaurante
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminRestaurantes;