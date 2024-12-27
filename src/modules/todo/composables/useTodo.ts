import { tryOnBeforeUnmount } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useHttpAbort } from '@/core/composables/useHttpAbort';
import http from '@/plugins/axios';

import type { ITodoItem, ITodoResponse } from '../model/todo.model';

export const TODO_ABORT_KEY = {
  TODO_FETCH_TODOS: 'TODOS_FETCH_TODOS',
  TODO_FETCH_TODO: 'TODOS_FETCH_TODO',
};

export function useGetListTodo() {
  const { httpAbort_abortRequests, httpAbort_registerAbort } = useHttpAbort();
  const route = useRoute();

  const todo_list = ref<ITodoResponse>({ todos: [], limit: 0, skip: 0, total: 0 });
  const todo_numOfRequestList = ref(0);
  const todo_listLoading = computed(() => todo_numOfRequestList.value > 0);

  const todo_fetchList = async (params: Record<string, TKey>) => {
    try {
      todo_numOfRequestList.value++;
      const { data } = await http.get<ITodoResponse>('/todos', {
        params: { ...route.query, ...params },
        ...httpAbort_registerAbort(TODO_ABORT_KEY.TODO_FETCH_TODOS),
      });
      todo_list.value = data;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      todo_numOfRequestList.value--;
    }
  };

  tryOnBeforeUnmount(() => {
    httpAbort_abortRequests([TODO_ABORT_KEY.TODO_FETCH_TODOS]);
  });

  return {
    todo_fetchList,
    todo_list,
    todo_listLoading,
    todo_numOfRequestList,
  };
}

export function useGetTodo(id: string) {
  const { httpAbort_abortRequests, httpAbort_registerAbort } = useHttpAbort();

  const todo_todo = ref<ITodoItem>();
  const todo_numOfRequestTodo = ref(0);
  const todo_todoLoading = computed(() => todo_numOfRequestTodo.value > 0);

  const todo_fetchTodo = async () => {
    try {
      todo_numOfRequestTodo.value++;
      const { data } = await http.get<ITodoItem>(`/todos/${id}`, {
        ...httpAbort_registerAbort(TODO_ABORT_KEY.TODO_FETCH_TODO),
      });
      todo_todo.value = data;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      todo_numOfRequestTodo.value--;
    }
  };

  tryOnBeforeUnmount(() => {
    httpAbort_abortRequests([TODO_ABORT_KEY.TODO_FETCH_TODO]);
  });

  return {
    todo_fetchTodo,
    todo_todo,
    todo_todoLoading,
    todo_numOfRequestTodo,
  };
}

export function useCreateTodo() {
  const todo_numOfRequestCreate = ref(0);
  const todo_loadingCreate = computed(() => todo_numOfRequestCreate.value > 0);

  const todo_createTodo = async (payload: Omit<ITodoItem, 'id'>) => {
    try {
      todo_numOfRequestCreate.value++;

      const { data } = await http.post('/todos/add', payload);
      return Promise.resolve(data as ITodoItem);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      todo_numOfRequestCreate.value--;
    }
  };

  return {
    todo_createTodo,
    todo_numOfRequestCreate,
    todo_loadingCreate,
  };
}

export function useEditTodo() {
  const todo_numOfRequestEdit = ref(0);
  const todo_loadingEdit = computed(() => todo_numOfRequestEdit.value > 0);

  const todo_editTodo = async (id: string, payload: Omit<ITodoItem, 'id'>) => {
    try {
      todo_numOfRequestEdit.value++;

      const { data } = await http.put(`/todos/${id}`, payload);
      return Promise.resolve(data as ITodoItem);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      todo_numOfRequestEdit.value--;
    }
  };

  return {
    todo_loadingEdit,
    todo_editTodo,
    todo_numOfRequestEdit,
  };
}

export function useDeleteTodo() {
  const todo_numOfRequestDelete = ref(0);
  const todo_loadingDelete = computed(() => todo_numOfRequestDelete.value > 0);

  const todo_deleteTodo = async (id: string) => {
    try {
      todo_numOfRequestDelete.value++;

      const { data } = await http.delete(`/todos/${id}`);
      return Promise.resolve(data as ITodoItem);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      todo_numOfRequestDelete.value--;
    }
  };

  return {
    todo_loadingDelete,
    todo_deleteTodo,
    todo_numOfRequestDelete,
  };
}
