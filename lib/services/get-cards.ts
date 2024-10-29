interface GetCardsProps {
  config: {
    apiKey: string;
    boardId: string;
  };
}

export const GetCards = async ({ config }: GetCardsProps) => {
  try {
    const res = await fetch("http://localhost:8000/get-cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-notion-key": config.apiKey,
      },
      body: JSON.stringify({
        boardId: config.boardId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch cards");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
