import { SelectionProvider } from "../../context/selection/SelectionProvider";
import { Main } from "../Main";
import { NotionProvider } from "../../context/notion/NotionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryClientInstance = new QueryClient();

export default function Noted({
  apiKey,
  boardId,
}: {
  apiKey: string;
  boardId: string;
}) {
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
