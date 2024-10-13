import { Noted } from "../";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Noted
        apiKey={import.meta.env.VITE_NOTION_API_KEY}
        boardId={import.meta.env.VITE_NOTION_BOARD_ID}
      />
    </div>
  );
}

export default App;
