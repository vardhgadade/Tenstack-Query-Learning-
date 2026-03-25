
import { useEffect } from "react";
import { GITAPIHITTING } from "../Controllers/apihitting";
import { useInfiniteQuery } from "@tanstack/react-query";

export const FetchOld = () => {

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isLoading,
        error,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["Users"],
        queryFn: ({ pageParam = 1 }) => GITAPIHITTING({ pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        }
    });

    // ✅ Smooth infinite scroll
    const handleScroll = () => {
        const bottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 200;

        if (bottom && hasNextPage) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage]);

    // ✅ Loading & Error states
    if (isLoading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5">Error loading data</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">
                INFINITE SCROLLING WITH REACT QUERY
            </h1>

            {/* ✅ Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.pages?.map((page) =>
                    page.map((user) => (
                        <div
                            key={user.id}
                            className="border p-2 rounded shadow"
                        >
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-full h-32 object-cover rounded"
                            />
                            <p className="text-center mt-2 text-sm">
                                {user.login}
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* ✅ Loader while fetching next page */}
            {isFetchingNextPage && (
                <p className="text-center mt-4">Loading more...</p>
            )}
        </div>
    );
};