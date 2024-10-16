import { Noted } from "../";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
