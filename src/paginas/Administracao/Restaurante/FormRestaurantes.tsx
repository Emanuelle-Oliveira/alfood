import {Box, Button, TextField, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import http from '../../../http';

export default function FormRestaurantes () {

  // Pega o id na url para edição
  const parametros = useParams();

  // Caso o parametro mude
  useEffect(() => {
    // Somente se existir parametros
    if(parametros.id) {
      http.get(`restaurantes/${parametros.id}/`)
        .then(response =>
          setNomeRestaurante(response.data.nome) //Coloca o nome do restaurante no input
        );
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState('');
  // Ao clicar no botão
  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Não recarregar a página

    // Se o parametro existir -> Update (PUT)
    // Senão -> Create (POST)

    if(parametros.id) {
      http.put(`restaurantes/${parametros.id}/`,{
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante atualizado com sucesso!');
        });

    } else { // Create - POST
      // Salvar restaurante no backend
      // Post: 1º = url, 2º = objeto com atributos
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!');
        });
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br/>
      <Typography component="h1" variant="h6">
      Formulário de Restaurantes
      </Typography>
      <br/>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante} // Valor do nome do restaurante
          // Quando houver mudança: valor do nome é atualizado
          onChange={ event => setNomeRestaurante(event.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          variant="outlined"
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}