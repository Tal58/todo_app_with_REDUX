import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodoAsync = createAsyncThunk("todos/getTodosAsync", async () =>{
    const res = await fetch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return await res.json()
})


export const addTodoAsync =createAsyncThunk("todos/addTodoAsync", async (data) =>{
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data)
    return res.data
})

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({id,data})=>{
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
})
export const removeTodoAsync = createAsyncThunk("todos/removeTodoAsync", async (id)=>{
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return id;
})
export const todosSlice = createSlice({

    name: "todos",
    initialState:{
        items: [ 
            
        //     {
        //     id:"1",
        //     title:"Learn React",
        //     completed: true,
        // },
        // {
        //     id:"2",
        //     title:"Read a book",
        //     completed:false,
        // }
    ],
    isLoading: false,
    error:null,
    activeFilter:"all",
    addNewTodoIsLoading: false,
    addNewTodoError: null,
    },
    reducers:{
        // addTodo:(state,action) =>{
        //     state.items.push(action.payload);
        // },
        // toggle:(state,action) =>{
        //     const {id} =action.payload
        //     const item = state.items.find((item)=>item.id ===id);
        //     item.completed = !item.completed
        // },
        // destroy: (state,action)=>{
        //     const id = action.payload;
        //     const filtered = state.items.filter((item)=> item.id !==id);
        //     state.items =filtered

        // },
        changeActiveFilter: (state, action)=>{
            state.activeFilter = action.payload
        },
        clearCompleted: (state) =>{
            const filtered = state.items.filter(item=>item.completed === false)
            state.items = filtered
        }
    },
    extraReducers:{
        //get todos
        [getTodoAsync.pending]:(state, action) =>{
            state.isLoading = true;
        },
        [getTodoAsync.fulfilled]: (state, action) =>{
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodoAsync.rejected]: (state, action) =>{
            state.error= action.error.message;
            state.isLoading = false;
        },
        //add todos
        [addTodoAsync.pending]: (state, action) =>{
            state.addNewTodoIsLoading = true;
        },
        [addTodoAsync.rejected]: (state, action) =>{
            state.addNewTodoError= action.error.message;
            state.addNewTodoIsLoading = false;
        },
        [addTodoAsync.fulfilled]: (state, action) =>{
            state.items.push(action.payload);
            state.addNewTodoIsLoading = false;},

        //toggle todo        
        [toggleTodoAsync.fulfilled] : (state, action) =>{
            console.log(action.payload);
            const {id, completed} = action.payload;
            const index = state.items.findIndex(item =>item.id ===id);
            state.items[index].completed = completed;
        },
        //remove todo
        [removeTodoAsync.fulfilled]: (state, action) =>{
          console.log(action.payload)  
          const id = action.payload;
          const filtered = state.items.filter((item)=> item.id !==id);
          state.items =filtered
        }
            
    }

})

export const selectTodos = (state)=>state.todos.items
export const selectFilteredTodos = (state) =>{
    if (state.todos.activeFilter === "all"){
        return state.todos.items
    }else {
        return state.todos.items.filter((todo)=>
        state.todos.activeFilter === "active" ? todo.completed===false : todo.completed ===true)
    }
}

export const {changeActiveFilter, clearCompleted} = todosSlice.actions
export default todosSlice.reducer;