# todo-memory-store

This implements a basic in-memory store for building demo Todo list apps for bicycle. It includes two default todos so you don't have to start with the empty state.

## Installation

```
yarn add todo-memory-store
```

## Types

```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
interface TodoInput {
  title: string;
  completed: boolean;
}
```

## API

```ts
import * as store from 'todo-memory-store';
```

- `store.addTodo(todo: TodoInput): Promise<void>`
- `store.toggleAll(checked: boolean): Promise<void>`
- `store.toggle(id: string, checked: boolean): Promie<void>`
- `store.destroy(id: string): Promie<void>`
- `store.setTitle(id: string, title: string): Promie<void>`
- `store.clearCompleted(): Promie<void>`
- `store.getTodos(): Promise<Array<Todo>>`
- `store.getTodo(id: string): Promise<Todo | null>`

## Testing

The following methods are exposed for use in tests:

- `store.getTodosSync()` - get the TODO entries in the store synchronously
- `store.reset()` - reset to the two default TODO entries
- `store.setLatency(latencyMilliseconds: number)` - change the artificial latency, defaults to 200ms
- `store.enableDeterminsticIDs()` - make the UUIDs generated for newly created TODOs deterministic, rather than random
- `store.disbaleDeterminsticIDs()` - undo `enableDeterminsticIDs`
- `uuid` - generate a uuid, or get the next deterministic id
