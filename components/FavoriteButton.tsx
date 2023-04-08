import React, { useCallback, useMemo } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
interface FavoriteButtonProps {
  movieId: string;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: user, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || [];
    return list.includes(movieId);
  }, [user, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;
    try {
      if (isFavorite) {
        response = await axios.delete("/api/favorite", { data: { movieId } });
      } else {
        response = await axios.post("/api/favorite", { movieId });
      }
      const updatedFavoriteIds = response?.data?.favoriteIds;
      mutate({
        ...user,
        favoriteIds: updatedFavoriteIds,
      });
      mutateFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [movieId, isFavorite, user, mutate, mutateFavorites]);
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <button
      onClick={toggleFavorite}
      type="button"
      className="
   group/item
  w-6
  h-6 lg:w-10
  lg:h-10
  border-2 border-white rounded-full
  flex
  justify-center items-center transition
   hover:border-neutral-300

  
  
  ">
      <Icon className="text-white" size={25} />
    </button>
  );
};

export default FavoriteButton;
