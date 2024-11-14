import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Músicas</Link>
                <Link to="/listas-reproduccion">Listas de Reproducción</Link>
                <Link to="/crear-canciones">Añadir Canciones</Link>
                <Link to="/crear-lista">Añadir Lista de Reproducción</Link>
            </nav>
        </header>
    );
};

export default Header;