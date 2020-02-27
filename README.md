# BError - Better Error Handling

Inspired by [VError](https://github.com/joyent/node-verror)

```typescript
import {BError} from "berror"

const foo = "bar"
try {
  // do something with foo
} catch (e) {
  new BError("Could not do something with foo", e, {foo}).log()
}
```

Will log `Could not do something with foo: Something went wrong {foo: "bar"}`.

If you don't want to log the error you can just re-throw it. The message and the metadata will be bubbled up until one error is logged.
