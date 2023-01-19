import {IRestaurante} from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import {useEffect, useState} from 'react';
import {IPrato} from '../../../interfaces/IPrato';
import axios from 'axios';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {

  const [pratos, setPratos] = useState<IPrato[]>();

  // Para cada restaurante carrega seus respectivos pratos
  useEffect(() => {
    //Obter pratos
    axios.get<IPrato[]>(`http://localhost:7000/api/v1/restaurantes/${restaurante.id}/pratos/`)
      .then(response => {
        setPratos(response.data); // data = todos os atributos do prato
      });
  }, [restaurante.id]);

  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {pratos?.map(item => // Mostra os pratos, caso existam
        <Prato prato={item} key={item.id}
        />
      )}
    </div>
  </section>);
};

export default Restaurante;