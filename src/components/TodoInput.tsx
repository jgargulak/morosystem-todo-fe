import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addTaskAsync, AppDispatch } from "../store/store";

const TodoInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [newTodoText, setNewTodoText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() !== "") {
      dispatch(addTaskAsync(newTodoText.trim()));
      setNewTodoText("");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <div className="flex-auto flex space-x-4 mt-4">
        <div className="w-4/5">
          <input
            className="h-8 px-2 rounded-md md:px-5 lg:px-8 w-full border-2 border-custom-yellow text-sm overflow-hidden whitespace-nowrap"
            type="text"
            value={newTodoText}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-1/5">
          <button
            className={`h-8 px-2 rounded-md md:px-5 lg:px-8 w-full bg-custom-yellow text-white flex flex-col items-center justify-center text-sm ${
              newTodoText.trim() ? "" : "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!newTodoText.trim()}
          >
            <div className="m-0 p-0 h-3 font-bold">Přidat</div>
            <div className="m-0 p-0 h-3 font-bold pb-5">Poznámku</div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoInput;
