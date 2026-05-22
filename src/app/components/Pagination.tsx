
type PaginationProps={
    page:number;
    setPage:(page:number)=>void;
    prev?:string|null;
    next?:string|null;
}

export default function Pagination ({page,setPage,prev,next}:PaginationProps){
    return (
        <div>
            <button disabled={!prev} onClick={()=> setPage(page-1)}>Anterior</button>
            <h3>Pagina {page}</h3>
            <button disabled={!next} onClick={()=> setPage(page+1)}>Siguiente</button>
        </div>
    );
}
