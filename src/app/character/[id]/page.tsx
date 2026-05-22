"use client"
import { useEffect,useState } from "react";
import { Character } from "../../types";
import { getCharacterById } from "../../lib/api/characters";
import { useParams, useRouter } from "next/navigation";
import CharacterCard from "../../components/CharacterCard";

const CharacterIdPage = () =>{

    const [cha,setCha] = useState<Character|null>(null);
    const {id}= useParams<{id:string}>();

    const router= useRouter();
    const [page,setPage]=useState<number>(1);

    const [loading,setloading]= useState<boolean>(true);
    const [miError, setError] = useState<string>("");

    const fetchcha = async () =>{
        try {
            setloading(true);
            const d = await getCharacterById(id);
            setCha(d);
        } catch (e) {
            setError("Error cargando los datos");
        }finally{
            setloading(false);
        }
    }

    useEffect(()=>{
        if(id){
            fetchcha();
        }
    },[id])

    if(loading){
        return <p>Cargando perosnaje....</p>
    }

    if (miError) {
     return <p>{miError}</p>;
    }

    if(!cha){
        return <p>No se ha encontrado el personaje F en el chat....</p>
    }

    return(
        <div>
            <button onClick={()=>router.back()}>Volver</button>
            
            <CharacterCard cha={cha} showDetails/>
        </div>
    );
}

export default CharacterIdPage;
