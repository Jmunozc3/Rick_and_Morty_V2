import api from "./axios"
import { Character, CharacterResponse, Location,LocationResponse } from "@/app/types"

export const getCharacterByPage = async (page:number): Promise<CharacterResponse> => {
    const res = await api.get<CharacterResponse>(`/character?page=${page}`);
    return res.data;
}

export const getCharacterByName = async (name:string, page:number = 1): Promise<CharacterResponse> => {
    const res = await api.get<CharacterResponse>(`/character?name=${name}&page=${page}`);
    return res.data;
}

export const getCharacterById = async (id:string): Promise<Character> => {
    const res= await api.get<Character>(`/character/${id}`);
    return res.data;
}

// Locations

export const getLocationByPage= async(page:number): Promise<LocationResponse>=>{
    const res=await api.get<LocationResponse>(`/location?page=${page}`);
    return res.data;
}

export const getLocationById= async(id:string): Promise<Location>=>{
    const res=await api.get<Location>(`/location/${id}`);
    return res.data;
}