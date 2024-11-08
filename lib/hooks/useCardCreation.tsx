import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePin } from "./usePin";
import { useNotion } from "./useNotion";
import { CreateACard } from "../services/create-card";


export const useCardCreation = () => {
  const queryClient = useQueryClient();
  const { config, bugTitle, bugDescription, name } =
    useNotion();
  const { resetPin, pinInfos } = usePin();

  return useMutation({
    mutationKey: ["create-card"],
    mutationFn: async () => {
			const pinCoords = {
				clickX: pinInfos.clickX,
				clickY: pinInfos.clickY,
				pathToTarget: pinInfos.pathToTarget,
			};

      resetPin();

      const res = await CreateACard({
        config,
        card_title: bugTitle,
        card_description: bugDescription,
        pinCoords,
        name: name!
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notion-cards"] });
    },
  });
};
