import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error("Failed to add a todo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

const todoEntity = createEntityAdapter({
  selectId: (todo) => todo.id,
});

const todoSlice = createSlice({
  name: "todo",
  initialState: todoEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        todoEntity.setAll(state, action.payload);
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        todoEntity.addOne(state, action.payload);
      })
      .addDefaultCase((state) => state);
  },
});

export const todoSelectors = todoEntity.getSelectors((state) => state.todo);

export default todoSlice.reducer;
