import axios from "axios";
import { useState, useEffect, createContext } from "react";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [bebidaId, setBebidaId] = useState(null);
  const [receta, setReceta] = useState({});
  useEffect(() => {
    const obtenerReceta = async () => {
      setCargando(true)
      if (!bebidaId) return;

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (error) {
        console.error(error);
      }finally{
        setCargando(false)
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  const handleModalClick = () => {
    setModal(!modal);
  };
  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };

  const consultarBebida = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;

      const { data } = await axios(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        handleModalClick,
        modal,
        setBebidaId,
        handleBebidaIdClick,
        receta,
        cargando
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
