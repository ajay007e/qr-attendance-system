import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { createQrSignature, verifyQrSignature, encodeQrPayload, decodeQrPayload } from "../../src/utils/qr";

describe("qr utils", () => {
  const secret = "test-secret";
  const payload = "session:123:nonce:abc";

  it("creates a deterministic signature", () => {
    const signature = createQrSignature(payload, secret);

    assert.equal(signature, createQrSignature(payload, secret));
    assert.ok(signature.length > 0);
  });

  it("verifies a valid signature", () => {
    const signature = createQrSignature(payload, secret);

    assert.equal(verifyQrSignature(payload, signature, secret), true);
  });

  it("rejects a signature with the same length but different content", () => {
    const signature = createQrSignature(payload, secret);

    const invalidSignature = signature[0] === "a" ? `b${signature.slice(1)}` : `a${signature.slice(1)}`;

    assert.notEqual(invalidSignature, signature);

    assert.equal(verifyQrSignature(payload, invalidSignature, secret), false);
  });

  it("rejects a signature with a different length", () => {
    const signature = createQrSignature(payload, secret);

    assert.equal(verifyQrSignature(payload, `${signature}x`, secret), false);
  });

  it("encodes and decodes a QR payload", () => {
    const value = "session:123:hello world?&✓";

    const encoded = encodeQrPayload(value);
    const decoded = decodeQrPayload(encoded);

    assert.equal(decoded, value);
  });

  it("handles an empty payload", () => {
    const encoded = encodeQrPayload("");

    assert.equal(encoded, "");
    assert.equal(decodeQrPayload(encoded), "");
  });
});
