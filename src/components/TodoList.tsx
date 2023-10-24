import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import { AppDispatch, fetchTasks } from "../store/store";

const TodoList: React.FC = () => {
  const { todos, filter, loading, error } = useSelector(
    (state: any) => state.todos,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (!Array.isArray(todos)) {
    return null;
  }

  const filteredTodos = todos.filter((todo: any) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <div>Načítání zápisníku...</div>
        <div className="border-t-4 border-black h-16 w-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>Došlo k chybě při načítání zápisníku: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="p-8 bg-black rounded shadow-lg max-w-md w-full">
        <div className="flex justify-end">
          <div className="text-1xl font-bold text-custom-yellow">MORO</div>
          <div className="text-1xl font-bold text-white">SYSTEMS</div>
        </div>
        <div className="text-2xl font-bold text-white">Zápisník</div>
        <TodoInput />
        <div className="list-inside space-y-1">
          {filteredTodos.map((todo: any) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
        <TodoFooter />
      </div>
    </div>
  );
};

export default TodoList;
