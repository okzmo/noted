interface GetMembersProps {
  config: {
    apiKey: string;
    boardId: string;
  };
}

export const GetMembers = async ({ config }: GetMembersProps) => {
  console.log("called");
  try {
    const res = await fetch("/notedtool-api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        Authorization: `Bearer ${config.apiKey}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      throw new Error("Failed to fetch members");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
