interface CreateCardProps {
  config: {
    apiKey: string;
    boardId: string;
  };
  card_title: string;
  card_description: string;
	pinCoords: {
		clickX: number;
		clickY: number;
		pathToTarget: string;
	};
  name: string
}

export const CreateACard = async ({
  config,
  card_title,
  card_description,
  pinCoords,
  name,
}: CreateCardProps) => {
  try {
    const formData = new FormData();
    formData.append("card_title", card_title);
    formData.append("card_description", card_description);
    formData.append("pinCoords", JSON.stringify(pinCoords));
    formData.append("boardId", config.boardId);
    formData.append("name", name);
    formData.append("location", location.href);

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
