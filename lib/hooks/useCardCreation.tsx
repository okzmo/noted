import { useMutation } from "@tanstack/react-query";
import { useSelection } from "./useSelection";
import { useNotion } from "./useNotion";
import { CreateACard } from "../services/create-card";

export const useCardCreation = () => {
  const { config, bugTitle, bugDescription, members } = useNotion();
  const { resetSelection, setVisible } = useSelection();

  return useMutation({
    mutationKey: ["create-card"],
    mutationFn: async () => {
      resetSelection();
      const res = await CreateACard({
        config,
        card_title: bugTitle,
        card_description: bugDescription,
        assignees: members,
      });
      return res;
    },
    onSuccess: () => {
      setVisible(false);
    },
  });
};
