import ReactMarkdown from "react-markdown";
import { app_background } from "./data/markdown";

const App = () => {
  return (
    <div className="home">
      <div id="content">
        <ReactMarkdown className="background" source={app_background} />
        <h3>Note App</h3>
      </div>
    </div>
  );
};

export default App;
