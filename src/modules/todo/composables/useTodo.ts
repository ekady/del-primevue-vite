import { storeToRefs } from 'pinia';
import { tryOnBeforeUnmount } from '@vueuse/core';

import { useHttpAbort } from '@/core/composables/useHttpAbort';
import { useTodoStore } from '@/modules/todo/store/todo.store';
import { ITodoItem } from '../model/todo.model';

export const TODO_ABORT_KEY = {
  TODO_FETCH_TODOS: 'TODOS_FETCH_TODOS',
  TODO_CREATE_TODO: 'TODO_CREATE_TODO',
  TODO_DELETE_TODO: 'TODO_DELETE_TODO',
};

const useTodo = (options?: IComponentComposableOptions) => {
  const { httpAbort_abortRequests, httpAbort_registerAbort } = useHttpAbort();
  const todosStore = useTodoStore();
  const { todo_list, todo_loading } = storeToRefs(todosStore);

  const todo_fetchTodos = async (params?: Record<string, TKey>) => {
    const todos = await todosStore.todo_fetchTodos(params, {
      ...httpAbort_registerAbort(TODO_ABORT_KEY.TODO_FETCH_TODOS),
    });
    return todos;
  };

  const todo_createUpdateTodo = async (payload: Omit<ITodoItem, 'id'>, id: string | null) => {
    const todo = await todosStore.todo_createUpdateTodos(payload, id, {
      ...httpAbort_registerAbort(TODO_ABORT_KEY.TODO_CREATE_TODO),
    });
    return todo;
  };

  const todo_fetchTodo = async (id: string) => {
    const todo = await todosStore.todo_fetchTodo(id, {
      ...httpAbort_registerAbort(TODO_ABORT_KEY.TODO_CREATE_TODO),
    });
    return todo;
  };

  const todo_deleteTodo = async (id: string) => {
    const todo = await todosStore.todo_deleteTodos({ id }, { ...httpAbort_registerAbort(TODO_ABORT_KEY.TODO_DELETE_TODO) });
    return todo;
  };

  tryOnBeforeUnmount(() => {
    httpAbort_abortRequests([TODO_ABORT_KEY.TODO_FETCH_TODOS]);

    if (options?.clearBeforeUnmount) todosStore.todo_reset();
  });

  return {
    todo_list,
    todo_loading,

    todo_fetchTodos,
    todo_fetchTodo,
    todo_createUpdateTodo,
    todo_deleteTodo,
  };
};

export default useTodo;
