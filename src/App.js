import Dosens from "./components/Dosens";
import Todo from "./components/Todo";
import BaseApi from "./config";

function App() {
  return (
    <div className="container">
      <Dosens api={BaseApi} />
      <Todo />
      <a href="#list-dosens">List dosens</a>
    </div>
  );
}

export default App;
