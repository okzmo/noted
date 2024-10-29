import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelection } from "./useSelection";
import { useNotion } from "./useNotion";
import { CreateACard } from "../services/create-card";
import { captureArea } from "../utils/capture-area";


export const useCardCreation = () => {
  const queryClient = useQueryClient();
  const { config, bugTitle, bugDescription, name } =
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

      const { dataUrl, dpr } = await captureArea();
      resetSelection();

      const res = await CreateACard({
        config,
        card_title: bugTitle,
        card_description: bugDescription,
        selectionCoords,
        dataUrl: dataUrl,
        dpr: dpr,
        name: name!
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notion-cards"] });
      setVisible(false);
    },
  });
};
