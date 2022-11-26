const { deterministicPartitionKey, constants } = require("./dpk");
const { MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY } = constants;

describe("deterministicPartitionKey", () => {
  it("Returns the value of TRIVIAL_PARTITION_KEY when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the passed partitionKey when valid partitionKey (as string) is present in event", () => {
    const event = {
      partitionKey: 'test',
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns the passed partitionKey after stringify-ing it when valid partitionKey (as integer) is present in event", () => {
    const event = {
      partitionKey: 1,
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });

  it("Returns the hashed partitionKey when partitionKey longer than MAX_PARTITION_KEY_LENGTH is present in event", () => {
    const event = {
      partitionKey: 'foo'.repeat(MAX_PARTITION_KEY_LENGTH),
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("cef71205309807fabe208161eda4443f8fb476906acfb98fb05713778ead1967b88b858a987d38d4d91fdce58cf9dbe2a02ae44114d5ad45c76b8bdec03bc09a");
  });


  it("Returns the hashed event when partitionKey is not present in event", () => {
    const event = {
      foo: 'bar',
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8");
  });
});
