interface GetMembersProps {
  config: {
    apiKey: string;
    boardId: string;
  };
}

export const GetMembers = async ({ config }: GetMembersProps) => {
  try {
    const res = await fetch("/api/notion/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        Authorization: `Bearer ${config.apiKey}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch members");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
