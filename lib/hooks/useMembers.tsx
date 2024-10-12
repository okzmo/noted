import { useQuery } from "@tanstack/react-query";
import { useNotion } from "./useNotion";
import { GetMembers } from "../services/get-members";

export const useMembers = () => {
  const { config, setMembers } = useNotion();

  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const data = await GetMembers({ config });
      setMembers(
        data.results
          .filter((member) => member.type === "person")
          .map((member) => ({ object: "user", id: member.id })),
      );
      return data;
    },
  });
};
