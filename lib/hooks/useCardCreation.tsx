import { useMutation } from "@tanstack/react-query";
import { useSelection } from "./useSelection";
import { useNotion } from "./useNotion";
import { CreateACard } from "../services/create-card";
import { captureArea } from "../utils/capture-area";

export const useCardCreation = () => {
  const { config, bugTitle, bugDescription, assignees, setAssignees } =
    useNotion();
  const { resetSelection, setVisible, selectionInfos } = useSelection();

  return useMutation({
    mutationKey: ["create-card"],
    mutationFn: async () => {
      const selectionCoords = {
        x: selectionInfos.x,
        y: selectionInfos.y,
        width: selectionInfos.width,
        height: selectionInfos.height,
      };
      const blob = await captureArea(selectionCoords);
      resetSelection();

      const filteredAssignees = assignees.map((assignee) => ({
        object: "user",
        id: assignee.id,
      }));
      const res = await CreateACard({
        config,
        card_title: bugTitle,
        card_description: bugDescription,
        assignees: filteredAssignees,
        blob: blob,
      });
      return res;
    },
    onSuccess: () => {
      setVisible(false);
      setAssignees([]);
    },
  });
};
