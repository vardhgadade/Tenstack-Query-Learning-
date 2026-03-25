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


export const DeletefromAPI=async(id)=>{
    try{

       return await api.delete(`/photos/${id}`)
    }catch(err){
       console.log("Error in DElete API HItting")

    }
}

export const UpdateTheData=async(id)=>{
    try{
       
        return await api.patch(`/photos/${id}`,{title:"I have Updated The Post"})
    }catch(err){
        console.log(err)
    }
}



export const GITAPIHITTING = async ({ pageParam = 1 }) => {
    try {
        const res = await axios.get(
            `https://api.github.com/users?per_page=10&page=${pageParam}`
        );

        return res.data;
    } catch (err) {
        console.log("Error fetching GitHub users", err);
        throw err;
    }
};