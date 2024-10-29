import { useQuery } from "@tanstack/react-query";
import { useNotion } from "./useNotion";
import { GetCards } from "../services/get-cards";

export const useGetCards = () => {
  const { config } = useNotion();

  return useQuery({
    queryKey: ["notion-cards"],
    queryFn: async () => {
      const data = await GetCards({ config });
      return data;
    },
    enabled: true
  });
};
