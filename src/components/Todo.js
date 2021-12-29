import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [activity, setActivity] = useState("");

  const defaultValue = () => {
    setActivity("");
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: new Date().getTime(),
        activity,
        done: false,
      },
    ]);
    defaultValue();
  };
  const chechkedHandler = (e) => {
    const indexOf = todos.findIndex((todo) => {
      return todo.id === e.id;
    });
    const copyTodos = [...todos];
    copyTodos[indexOf] = {
      ...e,
      done: !e.done,
    };
    setTodos(copyTodos);
  };

  return (
    <div className="card card-body mt-5 shadow">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Todo</h1>
          <form className="mb-3" onSubmit={formSubmit}>
            <input
              className="form-control mb-2"
              onChange={(e) => setActivity(e.target.value)}
              type="text"
              value={activity}
            />
            <button type="submit" className="btn btn-primary">
              Tambah
            </button>
          </form>
          <hr />
          <ul className="list-group list-group-flush">
            {todos.map((todo) => {
              return (
                <li className="list-group-item" key={todo.id}>
                  <input
                    className="form-check-input me-3"
                    onChange={() => chechkedHandler(todo)}
                    type="checkbox"
                  />
                  ({todo.done ? "Selesai" : "Laksanakan segera"}){" "}
                  {todo.activity}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
