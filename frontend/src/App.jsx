import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BibliotecaMusica from './components/BibliotecaMusica';
import CrearCanciones from './components/CrearCanciones';
import ListasReproduccion from './components/ListasReproduccion';
import CrearListaReproduccion from './components/CrearListaReproduccion';
import Header from './components/Header';
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BibliotecaMusica />} />
        <Route path='/crear-canciones' element={<CrearCanciones />} />
        <Route path="/listas-reproduccion" element={<ListasReproduccion />} />
        <Route path="/crear-lista" element={<CrearListaReproduccion />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
