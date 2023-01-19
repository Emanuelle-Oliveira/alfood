import {useEffect, useState} from 'react';
import {IRestaurante} from '../../../interfaces/IRestaurante';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';
import restaurante from '../../../componentes/ListaRestaurantes/Restaurante';
import http from '../../../http';

const AdminRestaurantes = () =>  {

  // Busca restaurante na api na url pora adm (sem paginação)
  useEffect(() => {
    http.get <IRestaurante[]> ('restaurantes/')
      .then(response =>
        setRestaurantes(response.data)
      );
  }, []);

  const [restaurantes, setRestaurantes] = useState <IRestaurante[]> ([]);

  function excluir(restauranteASerExcluido: IRestaurante) {
    http.delete(`restaurantes/${restauranteASerExcluido.id}/`)
      .then(() => {
        // Filtra somente os restaurante diferentes daquele a ser excluido
        const listaRestaurantes = restaurantes.filter(
          restaurante => restaurante.id !== restauranteASerExcluido.id);
        // Seta restaurantes como listaToda - restauranteASerExcluido
        setRestaurantes([...listaRestaurantes]);
      });
  }

  return(
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => // Gera uma linha para cada restaurante
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${restaurante.id}`}> Editar </Link>  ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(restaurante)} // Chamado o metodo excluir, passando o restaurante clicado
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminRestaurantes;