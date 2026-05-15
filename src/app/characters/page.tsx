"use client"
import { useEffect,useState } from "react"
import { CharacterResponse } from "../types"
import { getCharacterByName, getCharacterByPage } from "../lib/api/characters"
import { useRouter } from "next/navigation"


const CharacterPage =()=>{
    const [cha,setCha]=useState<CharacterResponse | null>(null);

    const [loading,setloading]= useState<boolean>(true);
    const[page,setPage]=useState<number>(1);

    const router= useRouter();
    const [miError, setError] = useState<string>("");

    const [search, setSearch] = useState<string>("")
    const [currentSearch, setCurrentSearch] = useState<string>("")

    const fetchCha= async()=>{
        try {
            setloading(true);
            setError("");

            const data = currentSearch
                ? await getCharacterByName(currentSearch, page)
                : await getCharacterByPage(page);

            setCha(data);
        } catch (e) {
            setCha(null);
            setError("No se encontraron personajes");
        }finally{
            setloading(false);
        }
    }

    useEffect(()=>{
        fetchCha(); 
    },[page, currentSearch])

    const handleSearch = () => {
        setPage(1);
        setCurrentSearch(search.trim());
    }

    if(loading){
        return <h1>LOADING BEBE...</h1>
    }

    return(
        <>

        <input type="text" placeholder="Buscar personaje..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        
        <button onClick={handleSearch}>Buscar</button>

        <div>
            {miError && <h1>{miError}</h1>}

            {cha?.results.map((personaje)=>(
                <div className="Personaje" onClick={()=> router.push(`/character/${personaje.id}`)} key={personaje.id}>
                    
                    <img className="Foto" src={personaje.image}/>
                    <h2>{personaje.name}</h2>
                </div>
            ))}
        </div>
        
        <div>
            <button disabled={!cha?.info.prev} onClick={()=>setPage(page-1)}>Anterior</button>
            <h3>Pagina {page}</h3>
            <button disabled={!cha?.info.next} onClick={()=>setPage(page+1)}>Siguiente</button>

        </div>
        
        </>

    );
}

export default CharacterPage;
