import { useState, useEffect, createContext } from "react"
import axios from "axios"

const NoticiasContext = createContext();

const NoticiasProvider = ({children}) => {

    const [categoria, setCategoria] = useState('general');
    const [noticias, setNoticias] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalNoticias, setTotalNoticias] = useState(0);

    // Cambio de categoría (página 1 por defecto)
    useEffect(() => {

        const consultarAPI = async () => {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/${categoria}/1`;

            const { data } = await axios(url);
            setNoticias(data.articles);
            setTotalNoticias(data.totalResults);
            setPagina(1);

        }

        consultarAPI();

    }, [categoria]);

    // Cambio de página
    useEffect(() => {

        const consultarAPI = async () => {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/${categoria}/${pagina}`;

            const { data } = await axios(url);
            setNoticias(data.articles);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }

        consultarAPI();

    }, [pagina]);

    const handleChangeCategoria = e => {

        setCategoria(e.target.value);

    }

    const handleChangePagina = (e, valor) => {

        setPagina(valor);

    }

    return(
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina,
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )

}

export {
    NoticiasProvider
}

export default NoticiasContext