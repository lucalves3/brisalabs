import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/context";
import darkModeLight from "../../images/moon-dark-mode.svg"
import ButtonDarkModeSTL from "../../utils/ButtonDarkModeSTL.styled";
import darkModeDark from "../../images/sun-dark-mode.svg"
import HomeCardTableSTL from "./homeCardTableSTL.styled";
import { getAllPokemons } from "../../services/api";
import PokeCards from "../pokeCards/pokeCards";
import HomeSectionSTL from "./homeSectionSTL.styled";

const HomeCardTable = () => {
  const {typeButton, setTypeButton, setTextButton, textButton} = useContext(Context);
  const [imageDM, setImageDM] = useState(darkModeLight);
  const [pokeDatas, setPokeDatas] = useState([]);

  useEffect(() => {
    async function getAllPoke() {
      const result = await getAllPokemons();
      setPokeDatas(result?.results);
    }
    getAllPoke()
  }, []);

  console.log(pokeDatas);

  const darkMode = () => {
    if (typeButton === false) {
      setTypeButton(true);
      setImageDM(darkModeDark)
      setTextButton('Tema claro');
    }
    if (typeButton === true) {
      setTypeButton(false);
      setImageDM(darkModeLight)
      setTextButton('Tema escuro');
    }
  };
  return (
    <HomeSectionSTL darkMode={typeButton}>
      <div style={{marginTop: '20px'}}>
        <button className="typePoke">
          Todos
        </button>
        <button className="typePoke">
          Fire
        </button>
        <button className="typePoke">
          Eletric
        </button>
        <button className="typePoke">
          Water
        </button>
      <ButtonDarkModeSTL onClick={darkMode} change={typeButton}>
        <img src={imageDM} alt={typeButton === false ? 'imagem de lua' : 'imagem de sol'} />
        {textButton}
      </ButtonDarkModeSTL>
      </div>
    <HomeCardTableSTL darkMode={typeButton}>
      { pokeDatas && pokeDatas.map((poke) => (
        <PokeCards 
        name={poke?.name}
        />
      )) }
    </HomeCardTableSTL>
    </HomeSectionSTL>
  );
};

export default HomeCardTable;