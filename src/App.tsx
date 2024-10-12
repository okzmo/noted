import { Noted } from "../";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Noted
        apiKey={import.meta.env.NOTION_API_KEY}
        boardId={import.meta.env.NOTION_BOARD_ID}
      />
    </div>
  );
}

export default App;
