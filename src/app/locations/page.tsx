"use client"
import { use, useEffect,useState } from "react"
import { CharacterResponse, LocationResponse } from "../types"
import { getLocationById,getLocationByPage } from "../lib/api/characters"
import { useRouter } from "next/navigation"
import Pagination from "../components/Pagination"
import LocationComponent from "../components/LocationCard"

const LocationPage =()=>{

    const[loc,setLoc]=useState<LocationResponse|null>(null);

    const [loading,setloading]=useState<boolean>(true);
    const [miError,setError]=useState<string>("");

    const router=useRouter();
    const [page,setPage]=useState<number>(1);

    const [search,setSearch]=useState<string>("");
    const [currentSearch,setCurrentSearch]=useState<string>("");


   const fetchLoc= async()=>{
    try {
        setloading(true);
        setError("");

        const data= await getLocationByPage(page);
        setLoc(data);
        
    } catch (e) {
        setLoc(null);
        setError("No se puedo encontrar")
        
    }finally{
        setloading(false);

    }

   }

   useEffect(()=>{
     fetchLoc();
   },[page])

   if(loading){
    return <h1>Loading...</h1>
   }
    

   return(
     <>
      <div>
         {miError && <h1>{miError}</h1>}

         {loc?.results.map((loc)=>(

            <div className="Personaje" key={loc.id}>

                <LocationComponent loc={loc} onClick={()=>router.push(`/location/${loc.id}`)}/>

            </div>

         ))}

      </div>

       <Pagination page={page} setPage={setPage} prev={loc?.info.prev} next={loc?.info.next}/>
    
      </>

   );

}

export default LocationPage;
