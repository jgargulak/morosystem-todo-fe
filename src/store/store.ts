import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  incompleteTask,
  updateTask,
} from "../api/api";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  filter: "all",
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "todos/fetchTasks",
  async () => await getTasks(),
);

export const addTaskAsync = createAsyncThunk(
  "todos/addTask",
  async (text: string) => await createTask(text),
);

export const deleteTaskAsync = createAsyncThunk(
  "todos/deleteTask",
  async (id: number) => {
    await deleteTask(id);
    return id;
  },
);

export const updateTaskAsync = createAsyncThunk(
  "todos/updateTask",
  ({ id, text }: { id: number; text: string }) => updateTask(id, text),
);

export const completeTaskAsync = createAsyncThunk(
  "todos/completeTask",
  async (id: number, thunkAPI) => {
    try {
      return await completeTask(id);
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  },
);

export const incompleteTaskAsync = createAsyncThunk(
  "todos/incompleteTask",
  async (id: number, thunkAPI) => {
    try {
      return await incompleteTask(id);
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  },
);

export const deleteCompletedTasksAsync = createAsyncThunk(
  "todos/deleteCompletedTasks",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { todos: TodoState };
    const completedTasks = state.todos.todos.filter((todo) => todo.completed);
    for (const task of completedTasks) {
      await deleteTask(task.id);
    }
    return completedTasks.map((task) => task.id);
  },
);

export const markAllTasksCompletedAsync = createAsyncThunk(
  "todos/markAllCompleted",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { todos: TodoState };
    const incompleteTodos = state.todos.todos.filter((todo) => !todo.completed);
    const promises = incompleteTodos.map((todo) => completeTask(todo.id));
    await Promise.all(promises);
    return incompleteTodos.map((todo) => ({ ...todo, completed: true }));
  },
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">,
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(completeTaskAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(incompleteTaskAsync.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (todoIndex !== -1) {
          state.todos[todoIndex] = action.payload;
        }
      })
      .addCase(deleteCompletedTasksAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => !action.payload.includes(todo.id),
        );
      })
      .addCase(markAllTasksCompletedAsync.fulfilled, (state, action) => {
        action.payload.forEach((completedTodo) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === completedTodo.id,
          );
          if (index !== -1) {
            state.todos[index] = completedTodo;
          }
        });
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred.";
      });
  },
});

export const { setFilter } = todosSlice.actions;

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
