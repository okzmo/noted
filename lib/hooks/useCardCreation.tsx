import { useMutation } from "@tanstack/react-query";
import { useInput } from "./useInput";
import { useNotion } from "./useNotion";
import { CreateACard } from "../services/create-card";

export const useCardCreation = () => {
  const { config, bugTitle, bugDescription, members } = useNotion();
  const { setBugTitle, setBugDescription, setVisible } = useInput();

  return useMutation({
    mutationKey: ["create-card"],
    mutationFn: async () => {
      setVisible(false);
      const res = await CreateACard({
        config,
        card_title: bugTitle!,
        card_description: bugDescription,
        assignees: members,
      });
      setBugTitle(null);
      setBugDescription("");
      return res;
    },
  });
};
