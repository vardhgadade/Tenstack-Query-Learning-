import { FetchPhotos } from "../Controllers/apihitting";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

export const FetchRq=()=>{
    const { data,isPending,error}= useQuery({
        queryKey:["Posts"],   //It worrks as USe states
        queryFn:FetchPhotos,
       // gcTime:1000 //Garbage Time It is used to manage Cache
       //staleTime:10000, //This Decides for how much long durating our Data is Fresh  and if youre settled x time and and let it you visited this page first at that time 
       //API Hitting is done for first time and again you visit that page again before the x time expires at that time it dont make any new request untill x time is over 
       //Let it you visit the page and youre on that same page and x time expires and then you left that page at that time the data goes to inactive stage
       refetchInterval:1000,
       refetchIntervalInBackground:true,
    })

    if(isPending) return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-2xl text-blue-500 animate-pulse">Loading....</h1>
        </div>
    )
    if(error) return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-2xl text-red-500">Error: {error.message}</h1>
        </div>
    )
    return(
        <>
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Posts List
            </h1>
            <div className="grid gap-4">
                {Array.isArray(data) && data.map((posts,id) => (
                    <NavLink  key={posts.id} to={`/rq/${posts.id}`}>
                    <div 
                         
                        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                    >
                        <h2 className="text-lg font-semibold text-blue-600 mb-2">
                            {posts.title}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {posts.body}
                        </p>
                    </div>

                    </NavLink>
                ))}
            </div>
        </div>

        </>
    )
}