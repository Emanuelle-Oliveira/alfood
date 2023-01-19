import {Button, TextField } from '@mui/material';
import React, {useState} from 'react';
import axios from 'axios';

export default function FormRestaurantes () {

  const [nomeRestaurante, setNomeRestaurante] = useState('');
  // Ao clicar no botão
  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Não recarregar a página
    // Salvar restaurante no backend
    // Post: 1º = url, 2º = objeto com atributos
    axios.post('http://localhost:7000/api/v2/restaurantes/', {
      nome: nomeRestaurante
    })
      .then(() => {
        alert('Restaurante cadastrado com sucesso!');
      });
  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        value={nomeRestaurante} // Valor do nome do restaurante
        // Quando houver mudança: valor do nome é atualizado
        onChange={ event => setNomeRestaurante(event.target.value)}
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  );
}