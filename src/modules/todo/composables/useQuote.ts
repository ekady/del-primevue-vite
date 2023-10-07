import { storeToRefs } from 'pinia';
import { tryOnBeforeUnmount } from '@vueuse/core';

import { useHttpAbort } from '@/core/composables/useHttpAbort';
import { useTodoStore } from '@/modules/todo/store/todo.store';

export const QUOTE_ABORT_KEY = {
  QUOTE_FETCH_QUOTES: 'QUOTE_FETCH_QUOTES',
};

const useQuote = () => {
  const { httpAbort_abortRequests, httpAbort_setAbortController } = useHttpAbort();
  const todosStore = useTodoStore();
  const { todo_quotes_list, todo_quotes_loading } = storeToRefs(todosStore);

  const quotes_fetchQuotes = async (params?: Record<string, any>) => {
    const todos = await todosStore.todo_fetchQuotes(params, {
      ...httpAbort_setAbortController(QUOTE_ABORT_KEY.QUOTE_FETCH_QUOTES),
    });
    return todos;
  };

  tryOnBeforeUnmount(() => {
    httpAbort_abortRequests([QUOTE_ABORT_KEY.QUOTE_FETCH_QUOTES]);
  });

  return {
    quotes_list: todo_quotes_list,
    quotes_loading: todo_quotes_loading,

    quotes_fetchQuotes,
  };
};

export default useQuote;
