import * as store from '../';

store.enableDeterminsticIDs();
store.setLatency(0);

afterEach(() => {
  store.reset();
});
test('getTodosSync()', async () => {
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);
});

test('addTodo({title, completed})', async () => {
  await store.addTodo({title: 'Hello World', completed: true});
  await store.addTodo({title: 'Goodbye World', completed: false});
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "d6b3e582-6c63-4aba-8fac-ba29654d32bd",
    "title": "Goodbye World",
  },
  Object {
    "completed": true,
    "id": "82985d45-4b5d-43f4-b982-f6b0e0b51239",
    "title": "Hello World",
  },
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);
});

test('toggleAll(checked)', async () => {
  await store.toggleAll(true);
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": true,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
  Object {
    "completed": true,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);

  await store.toggleAll(false);
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);
});

test('toggle(id, checked)', async () => {
  await store.toggle('b03ac358-7e2c-4dc1-962a-991c9cd2f0dd', true);
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": true,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);

  await store.toggle('b03ac358-7e2c-4dc1-962a-991c9cd2f0dd', false);
  await store.toggle('b03ac358-7e2c-4dc1-962a-991c9cd2f0dd', false);
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);
});

test('destroy(id)', async () => {
  await store.destroy('b03ac358-7e2c-4dc1-962a-991c9cd2f0dd');
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);
  store.reset();
  await store.destroy('a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4');
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
]
`);
});

test('setTitle(id, title)', async () => {
  await store.setTitle('b03ac358-7e2c-4dc1-962a-991c9cd2f0dd', 'Hello World');
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Hello World",
  },
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);
  store.reset();
  await store.setTitle('a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4', 'Hello World');
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Hello World",
  },
]
`);
});

test('clearCompleted()', async () => {
  await store.toggle('b03ac358-7e2c-4dc1-962a-991c9cd2f0dd', true);
  await store.clearCompleted();
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);
  store.reset();
  await store.toggle('a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4', true);
  await store.clearCompleted();
  expect(store.getTodosSync()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
]
`);
});

test('getTodo(id)', async () => {
  expect(await store.getTodo('b03ac358-7e2c-4dc1-962a-991c9cd2f0dd'))
    .toMatchInlineSnapshot(`
Object {
  "completed": false,
  "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
  "title": "Build Bicycle",
}
`);
  expect(await store.getTodo('a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4'))
    .toMatchInlineSnapshot(`
Object {
  "completed": false,
  "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
  "title": "Create an example",
}
`);
  expect(
    await store.getTodo('c03ac358-7e2c-4dc1-962a-991c9cd2f0dd'),
  ).toMatchInlineSnapshot(`null`);
});

test('getTodos()', async () => {
  expect(await store.getTodos()).toMatchInlineSnapshot(`
Array [
  Object {
    "completed": false,
    "id": "b03ac358-7e2c-4dc1-962a-991c9cd2f0dd",
    "title": "Build Bicycle",
  },
  Object {
    "completed": false,
    "id": "a4ecd6e2-29a7-4d93-bdfc-a7fa8471eed4",
    "title": "Create an example",
  },
]
`);
});
