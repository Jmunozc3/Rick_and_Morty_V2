import type { Character } from "../types"

type CharacterCardProps = {
    cha: Character;
    onClick?: () => void;
    showDetails?: boolean;
}

export default function CharacterCard({ cha, onClick, showDetails }: CharacterCardProps) {
    
    return (

        <div className="Personaje" onClick={onClick}>

            <img className="Foto" src={cha.image} alt={cha.name}/>

            <h2>{cha.name}</h2>

            {showDetails && (
                <>
                    <p>{cha.status}</p>
                    <p>{cha.species}</p>
                    <p>{cha.gender}</p>
                </>
            )}
        </div>
    );
}
