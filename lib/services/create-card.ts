interface CreateCardProps {
  config: {
    apiKey: string;
    boardId: string;
  };
  card_title: string;
  card_description: string;
  dataUrl: string;
  dpr: number;
  selectionCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const CreateACard = async ({
  config,
  card_title,
  card_description,
  dataUrl,
  dpr,
  selectionCoords,
}: CreateCardProps) => {
  try {
    const formData = new FormData();
    formData.append("image", dataUrl);
    formData.append("dpr", dpr.toString());
    formData.append("card_title", card_title);
    formData.append("card_description", card_description);
    formData.append("selectionCoords", JSON.stringify(selectionCoords));
    formData.append("boardId", config.boardId);

    const res = await fetch("http://localhost:8000/create-card", {
      method: "POST",
      headers: {
        "x-notion-key": config.apiKey,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to create card");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
