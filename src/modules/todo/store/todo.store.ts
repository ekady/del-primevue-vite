import type { AxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia';

import http from '@/plugins/axios';

import type { ITodoItem, ITodoQuotesResponse, ITodoResponse, ITodoStore } from '@/modules/todo/model/todo.model';

export const useTodoStore = defineStore('todos', {
  state: (): ITodoStore => ({
    todo_list: { todos: [], limit: 0, skip: 0, total: 0 },
    todo_request: 0,

    todo_quotes_request: 0,
    todo_quotes_list: { quotes: [], limit: 0, skip: 0, total: 0 },
  }),

  getters: {
    todo_loading: state => state.todo_request > 0,
    todo_quotes_loading: state => state.todo_quotes_request > 0,
  },

  actions: {
    todo_reset() {
      this.todo_list = { todos: [], limit: 0, skip: 0, total: 0 };
      this.todo_quotes_list = { quotes: [], limit: 0, skip: 0, total: 0 };
    },
    async todo_fetchTodos(
      params?: Record<string, string | number | null>,
      requestConfig?: AxiosRequestConfig,
    ): Promise<ITodoResponse> {
      try {
        this.todo_request++;
        const { data } = await http.get<ITodoResponse>('/todos', { params, ...requestConfig });
        this.todo_list = data;

        return Promise.resolve(data);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.todo_request--;
      }
    },
    async todo_fetchTodo(id: string, requestConfig?: AxiosRequestConfig): Promise<ITodoItem> {
      try {
        this.todo_request++;
        const { data } = await http.get<ITodoItem>(`/todo/${id}`, { ...requestConfig });

        return Promise.resolve(data);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.todo_request--;
      }
    },
    async todo_createUpdateTodos(
      payload: Omit<ITodoItem, 'id'>,
      id: string | null,
      requestConfig?: AxiosRequestConfig,
    ): Promise<ITodoItem> {
      try {
        this.todo_request++;

        const axiosOptions: AxiosRequestConfig = {
          method: id ? 'put' : 'post',
          data: payload,
          ...requestConfig,
        };
        const { data } = await http<ITodoItem>(`/todo/${id ?? ''}`, axiosOptions);

        return Promise.resolve(data);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.todo_request--;
      }
    },

    async todo_deleteTodos(payload: { id: string | number }, requestConfig?: AxiosRequestConfig): Promise<ITodoItem> {
      try {
        this.todo_request++;
        const { data } = await http.delete<ITodoItem>(`/todo/${payload.id}`, { ...requestConfig });
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.todo_request--;
      }
    },
    async todo_fetchQuotes(
      params?: Record<string, string | number | null>,
      requestConfig?: AxiosRequestConfig,
    ): Promise<ITodoQuotesResponse> {
      try {
        this.todo_quotes_request++;
        const { data } = await http.get<ITodoQuotesResponse>('/quotes', { params, ...requestConfig });
        this.todo_quotes_list = data;

        return Promise.resolve(data);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.todo_quotes_request--;
      }
    },
  },
});
