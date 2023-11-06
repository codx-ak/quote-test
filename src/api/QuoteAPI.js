import axios from "axios";

const API_URL='https://api.quotable.io/quotes'

export const GetQuote=async ({page,limit})=>{
    try{
        const responce= await axios.get(`${API_URL}?page=${page}&limit=${limit}`)
        return responce.data
    }
    catch(er){
        console.log(er);
    }
}

export const GetSearchQuote=async (query)=>{
    try{
        const responce= await axios.get(`https://api.quotable.io/search/quotes?query=${query}`)
        return responce.data
    }
    catch(er){
        console.log(er);
    }
}