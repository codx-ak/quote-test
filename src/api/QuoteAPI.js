import axios from "axios";

// pages and limit props to get data 
export const GetQuote=async ({page,limit})=>{
    try{
        const responce= await axios.get(`https://api.quotable.io/quotes?page=${page}&limit=${limit}`)
        return responce.data
    }
    catch(er){
        console.log(er);
    }
}

// search  query to get data 
export const GetSearchQuote=async (query)=>{
    try{
        const responce= await axios.get(`https://api.quotable.io/search/quotes?query=${query}`)
        return responce.data
    }
    catch(er){
        console.log(er);
    }
}