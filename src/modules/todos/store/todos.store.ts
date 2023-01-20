import type { AxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia';

import http from '@/plugins/axios';

import type { ITodoItem, ITodosQuotesResponse, ITodosResponse, ITodosStore } from '@/modules/todos/model/todos.model';

export const useTodosStore = defineStore('todos', {
  state: (): ITodosStore => ({
    todos_loading: false,
    todos_list: { todos: [], limit: 0, skip: 0, total: 0 },

    todos_quotes_loading: false,
    todos_quotes_list: { quotes: [], limit: 0, skip: 0, total: 0 },
  }),

  actions: {
    async todos_createTodos(payload: Partial<ITodoItem>, requestConfig?: AxiosRequestConfig): Promise<ITodoItem> {
      try {
        this.todos_loading = true;

        const { data } = await http.post<ITodoItem>('/todos/add', payload, { ...requestConfig });
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.todos_loading = false;
      }
    },
    async todos_fetchTodos(
      params?: Record<string, string | number | null>,
      requestConfig?: AxiosRequestConfig,
    ): Promise<ITodosResponse> {
      try {
        this.todos_loading = true;
        const { data } = await http.get<ITodosResponse>('/todos', { params, ...requestConfig });
        this.todos_list = data;

        return Promise.resolve(data);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.todos_loading = false;
      }
    },
    async todos_fetchQuotes(
      params?: Record<string, string | number | null>,
      requestConfig?: AxiosRequestConfig,
    ): Promise<ITodosQuotesResponse> {
      try {
        this.todos_quotes_loading = true;
        const { data } = await http.get<ITodosQuotesResponse>('/quotes', { params, ...requestConfig });
        this.todos_quotes_list = data;

        return Promise.resolve(data);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.todos_quotes_loading = false;
      }
    },
  },
});
