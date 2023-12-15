const sync = reqiure('../src/sync')

test("test", () => {
  expect(sync.test()).toBe({"message": "test"})
})
