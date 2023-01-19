import { Routes, Route } from 'react-router-dom';
import AdminRestaurantes from './paginas/Administracao/Restaurante/AdminRestaurantes';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import FormRestaurantes from './paginas/Administracao/Restaurante/FormRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurantes/>} />
      <Route path="/admin/restaurantes/novo" element={<FormRestaurantes/>} />
    </Routes>
  );
}

export default App;
