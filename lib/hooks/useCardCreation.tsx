import { useMutation } from "@tanstack/react-query";
import { useSelection } from "./useSelection";
import { useNotion } from "./useNotion";
import { CreateACard } from "../services/create-card";

export const useCardCreation = () => {
  const { config, bugTitle, bugDescription, assignees, setAssignees } =
    useNotion();
  const { resetSelection, setVisible, selectionInfos } = useSelection();

  return useMutation({
    mutationKey: ["create-card"],
    mutationFn: async () => {
      resetSelection();
      setVisible(false);
      const filteredAssignees = assignees.map((assignee) => ({
        object: "user",
        id: assignee.id,
      }));
      setAssignees([]);
      let res;
      setTimeout(async () => {
        res = await CreateACard({
          config,
          card_title: bugTitle,
          card_description: bugDescription,
          assignees: filteredAssignees,
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
  });
};
