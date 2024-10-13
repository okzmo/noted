import { SelectionProvider } from "../../context/SelectionContext";
import { Main } from "../Main";
import { NotionProvider } from "../../context/NotionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryClientInstance = new QueryClient();

export default function Noted({
  apiKey,
  boardId,
  bucketConfig,
}: {
  apiKey: string;
  boardId: string;
  bucketConfig: {
    bucketName: string;
    id: string;
    secret: string;
    url: string;
    region: string;
  };
}) {
  return (
    <QueryClientProvider client={QueryClientInstance}>
      <SelectionProvider>
        <NotionProvider
          apiKey={apiKey}
          boardId={boardId}
          bucketConfig={bucketConfig}
        >
          <Main />
        </NotionProvider>
      </SelectionProvider>
    </QueryClientProvider>
  );
}
