import {BError} from "./berror.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts"

Deno.test(function basic() {
  const e = new BError("A")
  assertEquals(e.message, "A");
})

Deno.test(function simpleChain() {
  const e = new BError("A", new BError("B", new Error("C")))
  assertEquals(e.message, "A: B: C");
})
