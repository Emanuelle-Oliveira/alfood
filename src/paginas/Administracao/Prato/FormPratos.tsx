import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link, MenuItem,
  Paper, Select,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import {IRestaurante} from '../../../interfaces/IRestaurante';
import restaurante from '../../../componentes/ListaRestaurantes/Restaurante';

export default function FormPratos () {

  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState <File | null> (null);

  // Lista de tags da apí
  const [tags, setTags] = useState<ITag[]>([]);
  // Lista de restaurantes da api
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  // Busca a lista de tags e restaurante quando o component é renderizado
  useEffect(() => {
    http.get <{ tags: ITag[] }>  ('tags/')
      .then(response => setTags(response.data.tags));
    http.get <IRestaurante[]>  ('restaurantes/')
      .then(response => setRestaurantes(response.data));
  }, []);

  // Como a imagem é opcional:
  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Se existe um arquivo
    if(event.target.files?.length) {
      setImagem(event.target.files[0]);
    } else {
      setImagem(null);
    }
  };


  // Ao clicar no botão
  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Não recarregar a página

    const formData = new FormData();

    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if(imagem) {
      formData.append('imagem', imagem);
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(()  => {
        // Limpar campos
        setNomePrato('');
        setDescricao('');
        setTag('');
        setRestaurante('');
        alert('Prato cadastrado com sucesso!');
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {/* Conteúdo da Página */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        <Typography component="h1" variant="h6">
          Formulário de Pratos
        </Typography>
        <Box component="form" sx={{ width: '100%'}} onSubmit={aoSubmeterForm}>
          <TextField
            value={nomePrato} // Valor do nome do prato
            // Quando houver mudança: valor do nome é atualizado
            onChange={ event => setNomePrato(event.target.value)}
            label="Nome do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />

          <TextField
            value={descricao}
            onChange={ event => setDescricao(event.target.value)}
            label="Descrição do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-tag">
              Tag
            </InputLabel>
            {/* Select com as tags buscadas da api */}
            <Select
              labelId="select-tag"
              value={tag}
              onChange={event => setTag(event.target.value)}
            >
              {tags.map(tag =>
                <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-restaurante">
              Restaurante
            </InputLabel>
            {/* Select com os restaurantes buscados da api */}
            <Select
              labelId="select-restaurante"
              value={restaurante}
              onChange={event => setRestaurante(event.target.value)}
            >
              {restaurantes.map(restaurante =>
                <MenuItem key={restaurante.id} value={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>
              )}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionarArquivo}/>

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
    </>
  );
}