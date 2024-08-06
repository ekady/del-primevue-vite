export type TTodoStatus = 'todo' | 'in_progress' | 'done';

export interface ITodoItem {
  userId: number | string;
  id: number;
  todo: string;
  completed: boolean;
}

export interface ITodoResponse extends IPagination {
  todos: ITodoItem[];
}

export interface ITodoStore {
  todo_request: number;
}
