import { assertEquals, assertStringIncludes } from "jsr:@std/assert";

import { BError } from "./berror.ts";

Deno.test("onlyMesesage", () => {
	const e = new BError("A");
	assertEquals(e.message, "A");
});

Deno.test("messageAndCause", () => {
	const e = new BError("A", Error("B"));
	assertEquals(e.message, "A: B");
});

Deno.test("full", () => {
	const e = new BError("A", Error("B"), { foo: "bar" });
	assertEquals(e.message, "A: B");
});

Deno.test("simpleChain", () => {
	const e = new BError("A", new BError("B", new Error("C")));
	assertEquals(e.message, "A: B: C");
});

Deno.test("metadata", () => {
	const e1 = new BError("A", undefined, { foo: "bar", age: 42 });
	const e2 = new BError("A", e1, { foo: "baz", name: "Deno" });
	assertEquals(e2.metadata, { foo: "baz", age: 42, name: "Deno" });
});

Deno.test("nonObject", () => {
	const e = new BError("A", { foo: "bar", age: 42 } as any);
	assertEquals(e.message, `A: non-error object thrown: {"foo":"bar","age":42}`);
});

const a = () => {
	throw Error("original error");
};
const b = () => a();
const c = () => {
	try {
		b();
	} catch (e: any) {
		throw new BError("could not run b", e);
	}
};

Deno.test("has original stack", () => {
	try {
		c();
	} catch (e: any) {
		assertStringIncludes(e.stack, "original error");
	}
});

const d = () => {
	try {
		b();
	} catch (_) {
		throw new BError("could not run b");
	}
};
Deno.test("has stack when no error is passed", () => {
	try {
		d();
	} catch (e: any) {
		assertStringIncludes(e.stack, "could not run b");
	}
});