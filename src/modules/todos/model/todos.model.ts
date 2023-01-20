import type { IPagination } from '@/modules/app/model/app.model';

export type ITodosStatus = 'todo' | 'in_progress' | 'done';

export type ITodoItem = {
  userId: number | string;
  id: number;
  todo: string;
  completed: boolean;
};

export type ITodoQuoteItem = {
  id: number;
  quote: string;
  author: boolean;
};

export type ITodosResponse = IPagination & {
  todos: ITodoItem[];
};

export type ITodosQuotesResponse = IPagination & {
  quotes: ITodoQuoteItem[];
};

export type ITodosStore = {
  todos_loading: boolean;
  todos_list: ITodosResponse;

  todos_quotes_loading: boolean;
  todos_quotes_list: ITodosQuotesResponse;
};
