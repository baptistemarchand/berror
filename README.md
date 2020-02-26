# BError - Simple Error Handling And Logging For Deno

Inspired by [VError](https://github.com/joyent/node-verror)

```typescript
import { BError } from "https://raw.githubusercontent.com/baptistemarchand/berror/master/berror.ts";

const foo = "bar"
try {
  // do something with foo
} catch (e) {
  new BError("Could not do something with foo", e, {foo}).log()
}
```

Will log `ERROR Could not do something with foo: Something went wrong {foo: "bar"}` if your default logger is setup to format the `args...`.

If you don't want to log the error you can just re-throw it. The message and the metadata will be bubbled up until one error is logged.
