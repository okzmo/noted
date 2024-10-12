interface CreateCardProps {
  apiKey: string;
  boardId: string;
  card_title: string;
  card_description: string;
  assignees: string[];
}

export const CreateACard = async ({
  apiKey,
  boardId,
  card_title,
  card_description,
  assignees,
}: CreateCardProps) => {
  try {
    const res = await fetch("/notedtool-api/v1/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        parent: {
          type: "database_id",
          database_id: boardId,
        },
        properties: {
          Title: {
            title: [{ text: { content: card_title } }],
          },
          Description: {
            rich_text: [{ text: { content: card_description } }],
          },
          Status: {
            select: {
              name: "Not started",
            },
          },
          Assignee: {
            people: [...assignees],
          },
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      console.log(res);
      throw new Error("Failed to create card");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
