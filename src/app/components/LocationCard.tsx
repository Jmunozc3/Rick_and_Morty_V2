import type { Location } from "../types";

type LocationProps={
    loc:Location;
    onClick?: ()=>void;
    showDetails?:boolean;
}

export default function LocationComponent ({loc,onClick,showDetails}:LocationProps){
    return(
        <>
         <div onClick={onClick}>

            <h2>{loc.name}</h2>

            {showDetails && (
                 
                 <>
                  <p> Created: {loc?.created}</p>
                  <p> Dimension: {loc?.dimension}</p>
                  <p> Tyoe: {loc?.type}</p>
                  <p> URL: {loc?.url}</p>
                 </>

            )
            
            }
        </div>  
        </>
       
    );
}
