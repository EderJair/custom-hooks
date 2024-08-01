

export const todoReducer = (initialState, action) => {


    switch (action.type) {
        case 'todoAdd':
            return [...initialState, action.payload];
        case 'todoDelete':
            return initialState.filter(todo => todo.id !== action.payload);
        case 'todoCheck' :
            return initialState.map(todo=>{
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
            }
            return todo;
        });
        default:
            return initialState;
    }

}