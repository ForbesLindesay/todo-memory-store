// this file is to simulate a database, its content probably isn't very interesting.

import uuid, {
  enableDeterminsticIDs,
  disbaleDeterminsticIDs,
  resetDeterminsticIDCounter,
} from './uuid';

export {enableDeterminsticIDs, disbaleDeterminsticIDs, uuid};

let LATENCY = 200;
export function setLatency(latencyMilliseconds: number) {
  LATENCY = latencyMilliseconds;
}

const DEFAULT = [
  {
    id: 'b03ac358-7e2c-4dc1-962a-991c9cd2f0dd',
    title: 'Build Bicycle',
    completed: false,
  },
  {
    id: 'a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4',
    title: 'Create an example',
    completed: false,
  },
];
let todos: typeof DEFAULT = JSON.parse(JSON.stringify(DEFAULT));

export function getTodosSync(): Array<Todo> {
  return JSON.parse(JSON.stringify(todos));
}
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
export interface TodoInput {
  title: string;
  completed: boolean;
}

export function reset() {
  todos = JSON.parse(JSON.stringify(DEFAULT));
  resetDeterminsticIDCounter();
}

export async function addTodo(todo: TodoInput) {
  const id = uuid();
  await new Promise(resolve => setTimeout(resolve, LATENCY));
  todos.unshift({id, title: todo.title, completed: todo.completed});
  return id;
}

export async function toggleAll(checked: boolean) {
  await new Promise(resolve => setTimeout(resolve, LATENCY));
  todos.forEach(todo => {
    todo.completed = checked;
  });
}

export async function toggle(id: string, checked: boolean) {
  await new Promise(resolve => setTimeout(resolve, LATENCY));
  todos.filter(t => t.id === id).forEach(todo => (todo.completed = checked));
}

export async function destroy(id: string) {
  await new Promise(resolve => setTimeout(resolve, LATENCY));
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos.splice(i, 1);
    }
  }
}

export async function setTitle(id: string, title: string) {
  await new Promise(resolve => setTimeout(resolve, LATENCY));
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].title = title;
    }
  }
}

export async function clearCompleted() {
  await new Promise(resolve => setTimeout(resolve, LATENCY));
  todos = todos.filter(t => !t.completed);
}

export async function getTodos(): Promise<Array<Todo>> {
  await new Promise(resolve => setTimeout(resolve, LATENCY));
  return JSON.parse(JSON.stringify(todos));
}

export async function getTodo(id: string): Promise<Todo | null> {
  await new Promise(resolve => setTimeout(resolve, LATENCY));
  return JSON.parse(JSON.stringify(todos.filter(t => t.id === id)[0] || null));
}
