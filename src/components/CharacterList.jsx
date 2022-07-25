import { useEffect, useState } from "react";
import Character from "./Character";

function NavPage(props){
  return(
    <header className="d-flex justify-content-between aling-items-center">
      <p>Page: {props.page}</p>
      <button className="btn btn-primary btn-sn"
        onClick={() => props.setpage(props.page + 1)} 
      >
        Page {props.page + 1}
      </button>
    </header>
  )
}

function CharacterList() {
  const [characters, setcharacters] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [page, setpage] = useState(1)

  useEffect(() => {
    async function fetchDatos() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setLoading(false) 
      setcharacters(data.results);
    }

    fetchDatos();
  }, [page]);


  return (
    <div className="">

      <NavPage page={page} setpage={setpage}/>

      {loading ? (
        <h1>loading...</h1>
       ) : (
        <div className="row">
        {characters.map((character) => {
          return (
            <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
          );
        })}
      </div>
      )}

      <NavPage page={page} setpage={setpage}/>
    </div> 
  );
}

export default CharacterList;
