import React, { useEffect, useReducer, useState } from 'react'
import { todoReducer } from './todoReducer';

export const useTodos = () => {

    // init recibe una función que se ejecuta al momento de inicializar el estado
    // el json.parse convierte el string en un objeto de javascript
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }
    

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    const handleNewTodo = (todo) => {

        const action = {
            type: 'todoAdd',
            payload: todo
        }
        dispatch(action)
        
    }

    const handleDelete = (id) => {

        const action = {
            type: 'todoDelete',
            payload: id
        }

        dispatch(action)

    }

    const handleCheck = (todoId) => {
        dispatch({
            type: 'todoCheck',
            payload: todoId
        })
    }



    
  return {
    todos,
    handleDelete,
    handleCheck,
    handleNewTodo,
    Ntodos: todos.length,
    Pendientes: todos.filter(todo => !todo.done).length
  }
}
