import { SelectionProvider } from "../../context/selection/SelectionProvider";
import { Main } from "../Main";
import { NotionProvider } from "../../context/notion/NotionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const QueryClientInstance = new QueryClient();

export default function Noted({
  apiKey,
  boardId,
}: {
  apiKey: string;
  boardId: string;
}) {


  useEffect(() => {
    const url = new URL(location.href)
    const top = url.searchParams.get("top")
    if (top) {
      window.scrollTo({top: Number(top), behavior: "smooth"})
      url.searchParams.delete("top")
      window.history.replaceState({}, "", url)
    }
  }, [])

  return (
    <QueryClientProvider client={QueryClientInstance}>
      <SelectionProvider>
        <NotionProvider apiKey={apiKey} boardId={boardId}>
          <Main />
        </NotionProvider>
      </SelectionProvider>
    </QueryClientProvider>
  );
}
