"use client"
import { useState,useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Location } from "@/app/types"
import { getLocationById } from "@/app/lib/api/characters"
import LocationComponent from "@/app/components/LocationCard"

const LocPage=()=>{

    const [loc,setLoc]=useState<Location|null>(null);

    const {id}= useParams<{id:string}>();

    const [error,seterror]=useState<string>("");
    const [loading,setloading]=useState<boolean>(true);

    const router=useRouter();

    const fetchLoc= async()=>{
        try {
            setloading(true);
            seterror("");

            const data= await getLocationById(id);
            setLoc(data);

        } catch (e) {
            setLoc(null);
            seterror("No se ha podido cargar la localización...");
            
        } finally{
            setloading(false);
        }
    }

    useEffect(()=>{
        if(id){
           fetchLoc();
        }
    },[id])

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }

    if(!loc){
        return <h1>No se ha encontrado la localización</h1>
    }

    return (
        <>
        
          <button onClick={()=> router.push("/locations") }>Volver</button>
           <LocationComponent loc={loc} showDetails/>
         
        </>
       

    );


}
export default LocPage;
