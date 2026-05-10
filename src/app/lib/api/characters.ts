import api from "./axios"
import { Character, CharacterResponse } from "@/app/types"

export const getCharacterByPage = async (page:number): Promise<CharacterResponse> => {
    const res = await api.get<CharacterResponse>(`/character?page=${page}`);
    return res.data;
}

export const getCharacterById = async (id:string): Promise<Character> => {
    const res= await api.get<Character>(`/character/${id}`);
    return res.data;
}
