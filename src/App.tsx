import { Noted } from "../";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Noted
        apiKey={import.meta.env.VITE_NOTION_API_KEY}
        boardId={import.meta.env.VITE_NOTION_BOARD_ID}
        bucketConfig={{
          bucketName: import.meta.env.VITE_S3_BUCKET_NAME,
          id: import.meta.env.VITE_S3_ID,
          secret: import.meta.env.VITE_S3_SECRET,
          url: import.meta.env.VITE_S3_URL,
          region: import.meta.env.VITE_S3_REGION,
        }}
      />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => console.log("")}>count is 0</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
