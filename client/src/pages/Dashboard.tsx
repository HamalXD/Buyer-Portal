import {
  useGetPropertiesQuery,
  useGetFavouritesQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from "../features/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store";
import { logout } from "../features/auth/authSlice";

export const Dashboard = () => {
  const { data: properties, isLoading: propLoading } = useGetPropertiesQuery();
  const { data: favourites } = useGetFavouritesQuery();
  const [addFav] = useAddFavouriteMutation();
  const [removeFav] = useRemoveFavouriteMutation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const favIds = favourites?.map((f: any) => f.property._id) || [];

  const handleFav = (id: string) => {
    if (favIds.includes(id)) removeFav(id);
    else addFav(id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <button
          onClick={() => dispatch(logout())}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl mb-2">Properties</h2>
      {propLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {properties?.map((p: any) => (
            <div key={p._id} className="border p-4 flex flex-col">
              <h3 className="font-bold">{p.title}</h3>
              <p>Price: {p.price}</p>
              <p>Location: {p.location}</p>
              <button
                onClick={() => handleFav(p._id)}
                className={`mt-2 p-2 text-white ${favIds.includes(p._id) ? "bg-red-500" : "bg-green-500"}`}
              >
                {favIds.includes(p._id) ? "Remove Favourite" : "Add Favourite"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
