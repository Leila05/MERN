import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BibliotecaMusica from './components/BibliotecaMusica';
import Musicas from './components/Musicas';
import CrearCanciones from './components/CrearCanciones';
import EditarCanciones from './components/EditarCancion';
import ListasReproduccion from './components/ListasReproduccion';
import CrearListaReproduccion from './components/CrearListaReproduccion';
import EditarListas from './components/EditarListas';
import Header from './components/Header';
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BibliotecaMusica />} />
        <Route path="/musicas" element={<Musicas />} />
        <Route path='/crear-canciones' element={<CrearCanciones />} />
        <Route path='/editar-canciones/:id' element={<EditarCanciones />} />
        <Route path="/listas-reproduccion" element={<ListasReproduccion />} />
        <Route path="/crear-lista" element={<CrearListaReproduccion />} />
        <Route path="/editar-lista/:id" element={<EditarListas />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
