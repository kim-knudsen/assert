# assert

[![JSR](https://jsr.io/badges/@knudsen/assert)](https://jsr.io/@knudsen/assert)
[![JSR Score](https://jsr.io/badges/@knudsen/assert/score)](https://jsr.io/@knudsen/assert)

A handful of useful TypeScript assertions for type narrowing. Published to [JSR](https://jsr.io/@knudsen/assert).

## Usage

```ts
import { assertTruthy } from '@knudsen/assert'

declare const x: number | string | undefined

assertTruthy(x) // number | string

assertTruthy(typeof x === 'string') // Narrows x to string

console.log(x.toUpperCase())
```

```ts
import { assertIsDefined } from '@knudsen/assert'

declare const user: { profileImage: string | undefined }

assertIsDefined(user.profileImage, 'profileImage') // Narrows profileImage to string

console.log('At this point we have a profile image defined', user.profileImage)
```

```ts
import { ensure } from '@knudsen/assert'

declare const user: { profileImage: string | undefined }

// Narrows profileImage to string and returns it
const image = ensure(user.profileImage, 'profileImage')

fetch(image).then(() => `🥳`)
```
