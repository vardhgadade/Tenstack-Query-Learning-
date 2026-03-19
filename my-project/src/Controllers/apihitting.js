import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const api= axios.create({
    baseURL:import.meta.env.VITE_API_URL
})


export const FetchPhotos = async (pageNo, limit = 30) => {
    try {
        const response = await api.get(`/photos?_page=${pageNo}&_limit=${limit}`);
        return response.data;
    } catch (err) {
        console.log("Error in API Hitting");
        throw err;
    }
};

export const IndividualtPage= async(id)=>{
    try{
       const respon=await api.get(`/photos/${id}`)

       return respon.data

    }catch(err){
        console.log(err)
        throw err
    }
}

