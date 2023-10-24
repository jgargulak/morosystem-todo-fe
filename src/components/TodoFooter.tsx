import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  deleteCompletedTasksAsync,
  markAllTasksCompletedAsync,
  setFilter,
} from "../store/store";

const TodoFooter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: any) => state.todos.todos);
  const filter = useSelector((state: any) => state.todos.filter);

  const anyCompleted = todos.some((todo: any) => todo.completed);

  const handleRemoveCompletedTodos = () =>
    dispatch(deleteCompletedTasksAsync());
  const handleMarkAllCompleted = () => {
    dispatch(markAllTasksCompletedAsync());
  };

  return (
    <>
      <div className="flex mt-4">
        <div className="flex-1 flex justify-between pr-2.5">
          {(filter === "all" || filter === "completed") && anyCompleted && (
            <button
              onClick={handleRemoveCompletedTodos}
              className="items-center flex-1 text-white border-white mx-1 rounded-md h-8 text-10px font-bold border border-black px-2 py-1 cursor-pointer"
            >
              Smazat
            </button>
          )}
          {todos.length > 0 && (
            <button
              onClick={handleMarkAllCompleted}
              className="text-10px rounded-md h-8 text-white border-white font-bold flex-1 h-8 mx-1 border border-black px-2 py-1 cursor-pointer"
            >
              Označit vše
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-between pl-2.5">
          <button
            onClick={() => dispatch(setFilter("all"))}
            className={`flex-1 h-8 rounded-md text-10px font-bold text-white border-white mx-1 border border-black px-2 py-1 cursor-pointer ${
              filter === "all" ? "bg-custom-yellow" : ""
            }`}
          >
            Vše
          </button>
          <button
            onClick={() => dispatch(setFilter("active"))}
            className={`flex-1 mx-1 rounded-md h-8 border border-black text-white border-white px-2 py-1 text-10px font-bold cursor-pointer ${
              filter === "active" ? "bg-custom-yellow" : ""
            }`}
          >
            Aktivní
          </button>
          <button
            onClick={() => dispatch(setFilter("completed"))}
            className={`flex-1 mx-1 border rounded-md h-8 border-black px-2 text-white border-white py-1 text-10px font-bold cursor-pointer ${
              filter === "completed" ? "bg-custom-yellow" : ""
            }`}
          >
            Dokončené
          </button>
        </div>
      </div>
      <div className="text-white text-10px pt-4 justify-end flex">
        © 2023 Josef Gargulák
      </div>
    </>
  );
};

export default TodoFooter;
