import { BError } from "./berror.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("onlyMesesage", function () {
  const e = new BError("A");
  assertEquals(e.message, "A");
});

Deno.test("messageAndCause", function () {
  const e = new BError("A", Error("B"));
  assertEquals(e.message, "A: B");
});

Deno.test("full", function () {
  const e = new BError("A", Error("B"), { foo: "bar" });
  assertEquals(e.message, "A: B");
});

Deno.test("simpleChain", function () {
  const e = new BError("A", new BError("B", new Error("C")));
  assertEquals(e.message, "A: B: C");
});

Deno.test("metadata", function () {
  const e1 = new BError("A", undefined, { foo: "bar", age: 42 });
  const e2 = new BError("A", e1, { foo: "baz", name: "Deno" });
  assertEquals(e2.metadata, { foo: "baz", age: 42, name: "Deno" });
});

Deno.test("nonObject", function () {
  const e = new BError("A", ({ foo: "bar", age: 42 }) as any);
  assertEquals(
    e.message,
    `A: non-error object thrown: {"foo":"bar","age":42}`
  );
});
