import { FetchPhotos } from "../Controllers/apihitting";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { DeletefromAPI,UpdateTheData  } from "../Controllers/apihitting";

export const FetchRq = () => {
    const [pageNo, setPageNo] = useState(1);
    const queryClient = useQueryClient();


    const deletePost=useMutation({
        mutationFn:(id)=>DeletefromAPI(id),
        onSuccess: (data, variables) => {
            // Remove the deleted item from all cached chunks
            queryClient.setQueriesData(["Posts"], (oldData) => {
                if (!oldData || !Array.isArray(oldData)) return oldData;
                return oldData.filter(item => item.id !== variables);
            });
        }
    })

    const updatePost=useMutation({
        mutationFn:(id)=>UpdateTheData(id),
        onSuccess:(apiData,postId)=>{
            queryClient.setQueryData(['Posts',currentChunk],(postsData)=>{
                return postsData?.map((curPost)=>{
                    return curPost.id=== postId?{...curPost,title: apiData.data.title}:curPost;
                })
            })
        }
    })

    //  const { data,isPending,error}= useQuery({
    //     queryKey:["Posts"],   //It worrks as USe states
    //     queryFn:FetchPhotos,
    //    // gcTime:1000 //Garbage Time It is used to manage Cache
    //    //staleTime:10000, //This Decides for how much long durating our Data is Fresh  and if youre settled x time and and let it you visited this page first at that time 
    //    //API Hitting is done for first time and again you visit that page again before the x time expires at that time it dont make any new request untill x time is over 
    //    //Let it you visit the page and youre on that same page and x time expires and then you left that page at that time the data goes to inactive stage
    //    refetchInterval:1000,
    //    refetchIntervalInBackground:true,
    //    keeppreviousdata:true //This keeps previous data untill data load it never get us to next to or previous it is used for avoiding Loading stata
    // })

    
    const itemsPerChunk = 30;  // Fetch 30 items per API call
    const itemsPerPage = 5;    // Display 5 items per page
    const totalPagesPerChunk = Math.floor(itemsPerChunk / itemsPerPage); // 6 pages per chunk

    // Calculate which chunk we're in (0-indexed)
    const currentChunk = Math.floor((pageNo - 1) / totalPagesPerChunk);
    
    // Calculate the page number for API call (1-indexed)
    const apiPageNumber = currentChunk + 1;

    const { data, isPending, error } = useQuery({
        queryKey: ["Posts", currentChunk],
        queryFn: () => FetchPhotos(apiPageNumber, itemsPerChunk),
        keepPreviousData: true,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    // Prefetch next chunk when user approaches the end of current chunk
    useEffect(() => {
        const nextChunk = currentChunk + 1;
        const nextChunkQueryKey = ["Posts", nextChunk];
        
        // Only prefetch if next chunk data is not already in cache
        const nextChunkState = queryClient.getQueryState(nextChunkQueryKey);
        
        if (pageNo >= totalPagesPerChunk * (currentChunk + 1) - 1) {
            // Only prefetch if query hasn't been fetched yet
            if (!nextChunkState || nextChunkState.status === 'idle') {
                queryClient.prefetchQuery({
                    queryKey: nextChunkQueryKey,
                    queryFn: () => FetchPhotos(apiPageNumber + 1, itemsPerChunk),
                });
            }
        }
    }, [pageNo, currentChunk, apiPageNumber, queryClient]);

    // Slice data to show only 5 items for current page
    const pageIndexInChunk = (pageNo - 1) % totalPagesPerChunk;
    const currentPageData = Array.isArray(data)
        ? data.slice(pageIndexInChunk * itemsPerPage, (pageIndexInChunk + 1) * itemsPerPage)
        : [];

    const goToNextPage = () => {
        setPageNo((prev) => prev + 1);
    };

    const goToPrevious = () => {
        if (pageNo > 1) {
            setPageNo((prev) => prev - 1);
        }
    };

    if (isPending) return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-2xl text-blue-500 animate-pulse">Loading....</h1>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-2xl text-red-500">Error: {error.message}</h1>
        </div>
    );

    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Posts List (Page {pageNo})
                </h1>
                <div className="grid gap-4">
                    {currentPageData.map((posts) => (
                        <NavLink key={posts.id} to={`/rq/${posts.id}`}>
                            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                <h2 className="text-lg font-semibold text-blue-600 mb-2">
                                    {posts.title}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {posts.body}
                                </p>
                              <button onClick={(e)=>{
                                e.preventDefault();
                                deletePost.mutate(posts.id);

                              }}
                              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" >Delete!</button>
                              <button onClick={(e)=>{
                                e.preventDefault();
                                e.stopPropagation()
                                updatePost.mutate(posts.id);

                              }}
                              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" >Update!</button>
                            </div>
                            
                        </NavLink>
                    ))}
                </div>
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={goToPrevious}
                        disabled={pageNo === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-lg font-semibold">
                        Page {pageNo}
                    </span>
                    <button
                        onClick={goToNextPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};
