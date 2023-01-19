import {IRestaurante} from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {IPaginacao} from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  // Utilizando pagina anterior e proxima pagina
  // Não é necessário ...restaurantes
  const carregarDados = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url)
      .then(response => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
        setPaginaAnterior(response.data.previous);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Sem dependência = só é executado uma vez quando o componente é montado
  useEffect(() => {
    /*//Obter restaurantes
  // Passa o tipo de retorno: Paginação de restaurantes
  //axios.get <IPaginacao<IRestaurante>> ('http://localhost:7000/api/v1/restaurantes/')
    .then(response => {
      //console.log(response);
      // results e next são atributos presentes na paginação, que vêm da api
      setRestaurantes(response.data.results);
      setProximaPagina(response.data.next);
    })
    .catch(error => {
      console.log(error);
    });*/
    // obter restaurantes
    carregarDados('http://localhost:7000/api/v1/restaurantes/');
  }, []);

  // Função é chamada ao clicar no botão de ver mais, carregando
  // a url da próxima página
  /*const verMais = () => {
    axios.get <IPaginacao<IRestaurante>> (proximaPagina)
      .then(response => {
        // Carrega restaurantes antigos e os novos
        // Gerando uma lista completa de restaurantes
        setRestaurantes([...restaurantes, ...response.data.results]);
        setProximaPagina(response.data.next);
      })
      .catch(error => {
        console.log(error);
      });
  };*/

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => // Mostra os restaurantes, caso existam
        <Restaurante restaurante={item} key={item.id}
        />
      )}
      {/*proximaPagina && // Se existir próxima página, cria o botão
        <button onClick={verMais}>
          Ver mais
        </button>*/}
      {<button
        onClick={() => carregarDados(paginaAnterior)}
        disabled={!paginaAnterior} /* Não aparece se a apagina não existir*/>
        Página Anterior
      </button>}
      {<button
        onClick={() => carregarDados(proximaPagina)}
        disabled={!proximaPagina}>
        Próxima página
      </button>}
    </section>
  );
};

export default ListaRestaurantes;