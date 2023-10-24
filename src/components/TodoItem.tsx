import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  completeTaskAsync,
  deleteTaskAsync,
  incompleteTaskAsync,
  updateTaskAsync,
} from "../store/store";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit3 } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);

  const handleToggleTodo = () => {
    if (todo.completed) {
      dispatch(incompleteTaskAsync(todo.id));
    } else {
      dispatch(completeTaskAsync(todo.id));
    }
  };
  const handleRemoveTodo = () => dispatch(deleteTaskAsync(todo.id));
  const handleStartEditing = () => {
    setEditing(true);
    setEditingText(todo.text);
  };
  const handleRenameTodo = (e: FormEvent) => {
    e.preventDefault();
    if (editingText.trim() !== "") {
      dispatch(updateTaskAsync({ id: todo.id, text: editingText.trim() }));
      setEditing(false);
    }
  };

  return (
    <div className="mt-4">
      {editing ? (
        <form onSubmit={handleRenameTodo}>
          <div className="flex items-center">
            <div className="flex-grow flex-shrink text-left whitespace-normal">
              <input
                className="rounded-md "
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex justify-end items-center justify-center min-w-0"
            >
              <IoIosCheckmarkCircleOutline size={20} className="text-white" />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-4/5">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleTodo}
              className="mr-2 accent-custom-yellow"
            />
            <div className="text-white w-full overflow-hidden break-words">
              {todo.text}
            </div>
          </div>
          <div className="flex w-1/5 justify-end">
            <TiDeleteOutline
              className="text-white cursor-pointer"
              onClick={handleRemoveTodo}
              size={20}
            />
            <FiEdit3
              className="text-white cursor-pointer ml-1"
              onClick={handleStartEditing}
              size={20}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
