import { useQuery } from "@tanstack/react-query";
import { IndividualtPage } from "../Controllers/apihitting";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Individual = () => {
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["IndividualPost", id],
    queryFn: () => IndividualtPage(id),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-blue-500 animate-pulse">Loading...</h1>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-red-500">Error...</h1>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Photo #{data.id}
        </h1>

        {/* Image */}
        <img
          src={data.url}
          alt={data.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        {/* Album + ID */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>Album ID: {data.albumId}</span>
          <span>ID: {data.id}</span>
        </div>

        {/* Thumbnail */}
        <div className="flex items-center gap-3">
          <img
            src={data.thumbnailUrl}
            alt="thumbnail"
            className="w-16 h-16 rounded-md border"
          />
          <p className="text-gray-600 text-sm">
            Thumbnail Preview
          </p>
        </div>

        {/* Go Back Button */}
        <div className="mt-6 text-center">
          <NavLink to="/Fetch-RQ">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
              ← Go Back
            </button>
          </NavLink>
        </div>

      </div>
    </div>
  );
};