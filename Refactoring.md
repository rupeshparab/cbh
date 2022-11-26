# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
I have broken down deterministicPartitionKey into 4 different methods each less than 10 lines compared to the original 26 lines.
Now there are no longer nested if-elses which make understanding the code flow difficult, also the code duplication has reduced.
I have tried to re-arrange the code such that the process remains same and generates the same output.
For example `if (typeof candidate !== "string")` line is not needed if we are creating hash `crypto.createHash("sha3-512").update(data).digest("hex")`, as it always returns a string. It is needed only if we directly use partitionKey from event and it is not a string.
Similarly, MAX_PARTITION_KEY_LENGTH which is 256 can also be breached only by partitionKey passed from event as `crypto.createHash("sha3-512").update(data).digest("hex")` has a fixed length of 128. The only case where this could fail is if MAX_PARTITION_KEY_LENGTH gets reduced (although in that case we would never get a smaller hash)
