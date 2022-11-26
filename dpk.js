const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;
const TRIVIAL_PARTITION_KEY = "0";

const createHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

const stringifyIfNeeded = (obj) => {
  if (typeof obj === "string") {
    return obj;
  }
  return JSON.stringify(obj);
}

const handlePartitionKeyInEvent = (partitionKey) => {
  const candidate = stringifyIfNeeded(partitionKey)
  if (candidate.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }

  return createHash(candidate);
};

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    return handlePartitionKeyInEvent(event.partitionKey);
  }

  return createHash(JSON.stringify(event));
};

exports.constants = {
  MAX_PARTITION_KEY_LENGTH: MAX_PARTITION_KEY_LENGTH,
  TRIVIAL_PARTITION_KEY: TRIVIAL_PARTITION_KEY
}
