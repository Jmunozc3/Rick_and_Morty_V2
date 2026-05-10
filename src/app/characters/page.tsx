"use client"
import { useEffect,useReducer,useState } from "react"
import { CharacterResponse } from "../types"
import { getCharacterByPage } from "../lib/api/characters"
import { useRouter } from "next/navigation"


const CharacterPage =()=>{
    const [cha,setCha]=useState<CharacterResponse | null>(null);

    const [loading,setloading]= useState<boolean>(true);
    const[page,setPage]=useState<number>(1);

    const router= useRouter();
    const [miError, setError] = useState<string>("");

    const fetchCha= async()=>{
        try {
            setloading(true);
            const data = await getCharacterByPage(page);
            setCha(data);
        } catch (e) {
            setError("Error al cargar los datos");
        }finally{
            setloading(false);
        }
    }

    useEffect(()=>{
        fetchCha(); 
    },[page])

    if(loading){
        return <h1>LOADING BEBE...</h1>
    }

    if(miError){
        <h1>{miError}</h1>
    }

    return(
        <>

        <div>
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