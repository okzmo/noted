import { SelectionProvider } from "../../context/SelectionContext";
import { Main } from "../Main";
import { NotionProvider } from "../../context/NotionContext";
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
