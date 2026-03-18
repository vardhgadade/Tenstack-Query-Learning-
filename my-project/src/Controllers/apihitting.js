import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const api= axios.create({
    baseURL:import.meta.env.VITE_API_URL
})


export const FetchPhotos=async()=>{
    const response= await api.get("/photos")

    return response.data
}

export const IndividualtPage= async(id)=>{
    try{
       const respon=await api.get(`/photos/${id}`)

       return respon.data

    }catch(err){
        console.log(err)
        throw err
    }
}