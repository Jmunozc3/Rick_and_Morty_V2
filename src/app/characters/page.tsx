"use client"
import { useEffect, useState } from "react"
import { getCharacterByName,getCharacterByPage } from "../lib/api/characters"
import { useRouter } from "next/navigation"
import { CharacterResponse } from "../types"
import Pagination from "../components/Pagination"
import CharacterCard from "../components/CharacterCard"

const fetchCha=()=>{
    const [cha,setcha]=useState<CharacterResponse|null>(null);

    const [page,setpage]=useState<number>(1);
    const [loading,setloading]=useState<boolean>(true);

    const [error,seterror]=useState<string>("");
    
    const [search,setsearch]=useState<string>("");
    const [currentsearch,setCurrentSearch]=useState<string>("");

    const router= useRouter();

    const fcha= async()=>{
        try {
            setloading(true);
            seterror("");

            const data= currentsearch
              ? await getCharacterByName(currentsearch,page)
              : await getCharacterByPage(page)

            setcha(data);
        } catch (e) {
            setcha(null);
            seterror("No se han podido encontrar los personajes");
        }finally{
            setloading(false);
        }
    }

    useEffect(()=>{
        fcha();
    },[page,currentsearch]);

    const handleSearch = ()=>{
        setpage(1);
        setCurrentSearch(search.trim());
    }

    if(loading){
        return <h1>Cargando....</h1>
    }

    return(
        <>
        
         <input type="text" placeholder="Buscar personaje..." value={search} onChange={(e)=>setsearch(e.target.value)}/>
         <button onClick={handleSearch}>Buscar</button>

         <div>
            {error && <h1>{error}</h1>}

            {cha?.results.map((cha)=>(

                <CharacterCard cha={cha} onClick={()=> router.push(`/character/${cha.id}`)} key={cha.id}/>
            ))}
         </div>

          {cha &&
          
             <Pagination page={page} setPage={setpage} prev={cha.info.prev} next={cha.info.next}/>

          }
          
        </>

    );

}
export default fetchCha;
