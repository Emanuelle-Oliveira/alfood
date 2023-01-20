import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';
import http from '../../../http';
import {IPrato} from '../../../interfaces/IPrato';

const AdminPratos= () =>  {

  const [pratos, setPratos] = useState <IPrato[]> ([]);

  // Busca pratos na api na url pora adm
  useEffect(() => {
    http.get <IPrato[]> ('pratos/')
      .then(response =>
        setPratos(response.data)
      );
  }, []);


  function excluir(pratoASerExcluido: IPrato) {
    http.delete(`pratos/${pratoASerExcluido.id}/`)
      .then(() => {
        // Filtra somente os pratos diferentes daquele a ser excluido
        const listaPratos = pratos.filter(
          prato => prato.id !== pratoASerExcluido.id);
        // Seta prtos como listaToda - pratoASerExcluido
        setPratos([...listaPratos]);
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
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
          {pratos.map(prato => // Gera uma linha para cada prato
            <TableRow key={prato.id}>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                [<a href={prato.imagem} target="blank" rel="noreferrer"> Ver imagem </a>]
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/pratos/${prato.id}`}> Editar </Link>  ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)} // Chamado o metodo excluir, passando o prato clicado
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

export default AdminPratos;