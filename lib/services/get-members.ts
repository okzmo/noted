interface GetMembersProps {
  config: {
    apiKey: string;
    boardId: string;
  };
}

export const GetMembers = async ({ config }: GetMembersProps) => {
  try {
    const res = await fetch("http://localhost:8000/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-notion-key": config.apiKey,
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
