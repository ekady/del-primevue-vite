import { storeToRefs } from 'pinia';

import { useHttpAbort } from '@/modules/app/composable/useHttpAbort';

import { useTodosStore } from '@/modules/todos/store/todos.store';
import type { ITodoItem } from '@/modules/todos/model/todos.model';
import { TODOS_REQUEST } from '@/modules/todos/constants/todos.constant';

export const useTodos = () => {
  const { httpAbort_registerAbort, httpAbort_clearAllRequest } = useHttpAbort();
  const store = useTodosStore();
  const storeRefs = storeToRefs(store);
  const { todos_list, todos_loading, todos_quotes_list, todos_quotes_loading } = storeRefs;

  const todos_fetchTodos = async (params?: Record<string, string | number | null>) => {
    try {
      const data = await store.todos_fetchTodos(params, { ...httpAbort_registerAbort(TODOS_REQUEST.FETCH_TODOS) });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const todos_createTodos = async (payload: Partial<ITodoItem>) => {
    try {
      const data = await store.todos_createTodos(payload, { ...httpAbort_registerAbort(TODOS_REQUEST.CREATE_TODOS) });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const todos_fetchQuotes = async (params?: Record<string, string | number | null>) => {
    try {
      const data = await store.todos_fetchQuotes(params, { ...httpAbort_registerAbort(TODOS_REQUEST.FETCH_QUOTES) });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    todos_store: store,
    todos_list,
    todos_loading,
    todos_quotes_list,
    todos_quotes_loading,
    todos_fetchTodos,
    todos_createTodos,
    todos_fetchQuotes,
    todos_clearAllRequest: httpAbort_clearAllRequest,
  };
};
