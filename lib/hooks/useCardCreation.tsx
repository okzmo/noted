import { useMutation } from "@tanstack/react-query";
import { useSelection } from "./useSelection";
import { useNotion } from "./useNotion";
import { CreateACard } from "../services/create-card";

export const useCardCreation = () => {
  const { config, bugTitle, bugDescription, members } = useNotion();
  const { resetSelection, setVisible, selectionInfos } = useSelection();

  return useMutation({
    mutationKey: ["create-card"],
    mutationFn: async () => {
      resetSelection();
      setVisible(false);
      let res;
      setTimeout(async () => {
        res = await CreateACard({
          config,
          card_title: bugTitle,
          card_description: bugDescription,
          assignees: members,
          selectionCoords: {
            x: selectionInfos.x,
            y: selectionInfos.y,
            width: selectionInfos.width,
            height: selectionInfos.height,
          },
        });
      }, 50);
      return res;
    },
    onSuccess: () => {
      setVisible(false);
    },
  });
};
