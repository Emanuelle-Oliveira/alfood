import { Routes, Route } from 'react-router-dom';
import AdminRestaurantes from './paginas/Administracao/Restaurante/AdminRestaurantes';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import FormRestaurantes from './paginas/Administracao/Restaurante/FormRestaurantes';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin/>}>
        <Route path="restaurantes" element={<AdminRestaurantes/>} />
        <Route path="restaurantes/novo" element={<FormRestaurantes/>} />
        <Route path="restaurantes/:id" element={<FormRestaurantes/>} />
      </Route>
    </Routes>
  );
}

export default App;
