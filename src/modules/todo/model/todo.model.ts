export type TTodoStatus = 'todo' | 'in_progress' | 'done';

export interface ITodoItem {
  userId: number | string;
  id: number;
  todo: string;
  completed: boolean;
}

export interface ITodoQuoteItem {
  id: number;
  quote: string;
  author: boolean;
}

export interface ITodoResponse extends IPagination {
  todos: ITodoItem[];
}

export interface ITodoQuotesResponse extends IPagination {
  quotes: ITodoQuoteItem[];
}

export interface ITodoStore {
  todo_request: number;
  todo_list: ITodoResponse;

  todo_quotes_request: number;
  todo_quotes_list: ITodoQuotesResponse;
}
