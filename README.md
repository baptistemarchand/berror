![npm type definitions](https://img.shields.io/npm/types/berror)
![npm](https://img.shields.io/npm/v/berror)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/baptistemarchand/berror)
![Maintenance](https://img.shields.io/maintenance/yes/2020)

# BError - Better Error Handling

Inspired by [VError](https://github.com/joyent/node-verror) and written in TypeScript. Compatible with deno. Zero dependencies.

A `BError` is just like a regular `Error` with three added benefits:

## Chain of causes
When you create a `BError` you can provide it with the error that caused it.
It doesn't need to be a `BError`. Any `Error` will work:
```typescript
try {
  throw new Error("Something went wrong")
} catch (e) {
  throw new BError("Oops", e)
}
// will create an error with the message: `Oops: Something went wrong`
```

## Metadata
You can add some metadata to your errors to help with debugging:
```typescript
const path = "/test"
try {
  tryToOpenPath(path)
} catch (e) {
  throw new BError("Could not open path", e, {path})
}
// will create an error with the message:
// `Could not open path: permission denied {path: "/test"}`
```
The metadata is kept in the chain,
the final error will contain all the metadata of the errors that caused it.
If two errors send the same metadata property, the last one will override the first one.

If you want to send metadata but you don't have an error that you just caught you can
pass `undefined` or `null` to the constructor: `new BError("Oops", undefined, {foo: 42})`

## Logging
BError comes with a `log` function that makes it easy and short to log the error.
```typescript
  // will log the error using console.error()
  new BError("Something went wrong").log()
```

### Using a custom logger
BError is meant to be extended to integrate your own logger.
Just extend the `BError` class and override the `log` function to do whatever you want.

Example with winston:

```typescript
import {BError} from "berror"
import {createLogger, transports} from 'winston'

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console()
  ]
})
  

export class MyError extends BError {
  public log(level: string) {
    if (level === "error") {
      logger.error(this.message, this.metadata)
    } else {
      logger.info(this.message, this.metadata)
    }
  }
}
``` 
