interface CreateCardProps {
  config: {
    apiKey: string;
    boardId: string;
  };
  card_title: string;
  card_description: string;
  assignees: string[];
}

export const CreateACard = async ({
  config,
  card_title,
  card_description,
  assignees,
}: CreateCardProps) => {
  console.log(assignees);
  try {
    const res = await fetch("/notedtool-api/v1/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        parent: {
          type: "database_id",
          database_id: config.boardId,
        },
        properties: {
          Name: {
            title: [{ text: { content: card_title } }],
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
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: card_description,
                  },
                },
              ],
            },
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      console.log(res);
      throw new Error("Failed to create card");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
