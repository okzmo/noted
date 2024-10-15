import { useQuery } from "@tanstack/react-query";
import { useNotion } from "./useNotion";
import { GetMembers } from "../services/get-members";
import { Member } from "../context/NotionContext";

export const useMembers = () => {
  const { config } = useNotion();

  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const data = await GetMembers({ config });
      return data.results.filter((member: Member) => member.type === "person");
    },
  });
};
