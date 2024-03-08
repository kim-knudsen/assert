# assert

[![JSR](https://jsr.io/badges/@knudsen/assert)](https://jsr.io/@knudsen/assert)
[![JSR Score](https://jsr.io/badges/@knudsen/assert/score)](https://jsr.io/@knudsen/assert)

A handful of useful assertions for type narrowing.

## Usage

```ts
declare const x: number | string | undefined
assertTruthy(x) // number | string

// Also usable with type guarding expressions!
assertTruthy(typeof x === 'string') // Narrows x to string
```

```ts
import { assertIsDefined } from '@knudsen/assert'

const user = await fetchUser()
assertIsDefined(response.profileImage, 'profileImage')

console.log(user.profileImage) // profileImage is now non-nullable
```

```ts
import { ensure } from '@knudsen/assert'

const user = await fetchUser()
const profileImage = ensure(response.profileImage, 'profileImage')

console.log(profileImage) // profileImage is now non-nullable
```
