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
      Hello test lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
      <div style={{ width: "200px", height: "200px", backgroundColor: "red" }}>
        test
      </div>
    </div>
  );
}

export default App;
