interface CreateErrorMessageConfig {
    default: string
    name: (name: string) => string
    message: (message: string) => string
}

/**
 * An error that is thrown when an assertion fails.
 */
export class AssertionError extends Error {
    /**
     * Creates a new `AssertionError` with the given message.
     *
     * @param message The message to include in the error.
     */
    constructor(message: string) {
        super(message)

        this.name = 'AssertionError'

        Object.setPrototypeOf(this, AssertionError.prototype)
    }
}

/**
 * Useful for type narrowing assertions.
 *
 * @param value The value to check for being truthy.
 * @param messageOrName An optional message or name for the assertion.
 *
 * ```ts
 * declare const x: number | string | undefined;
 * assertTruthy(x) // number | string
 *
 * // Also usable with type guarding expressions!
 * assertTruthy(typeof x === "string"); // Narrows x to string
 * ```
 */
export function assertTruthy<T>(value: T, messageOrName?: string): asserts value {
    if (!value) {
        const message = createErrorMessage(messageOrName, {
            default: 'Expected a truthy value, but received: ' + value,
            name: name => `Expected "${name}" to be a truthy value`,
            message: message => message
        })
        throw new AssertionError(message)
    }
}

/**
 * Useful for type narrowing assertions, especially when dealing with `null` or `undefined`.
 *
 * ```ts
 * import { assertIsDefined } from '@knudsen/assert'
 *
 * const user = await fetchUser()
 * assertIsDefined(response.profileImage, 'profileImage')
 *
 * console.log(user.profileImage) // profileImage is now non-nullable
 * ```
 *
 * @param value The value to check for being defined.
 * @param messageOrName An optional message or name for the assertion.
 */
export function assertIsDefined<T>(value: T, messageOrName?: string): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        const message = createErrorMessage(messageOrName, {
            default: 'Expected a defined value, but received: ' + value,
            name: name => `Expected "${name}" to be defined`,
            message: message => message
        })

        throw new AssertionError(message)
    }
}

/**
 * Ensures/asserts that the given value is an instance of the given type and then returns that value.
 *
 * ```ts
 * import { ensure } from '@knudsen/assert'
 *
 * const user = await fetchUser()
 * const profileImage = ensure(response.profileImage, 'profileImage')
 *
 * console.log(profileImage) // profileImage is now non-nullable
 * ```
 *
 * @param value The value to check for being an instance of the given type.
 * @param messageOrName An optional message or name for the assertion.
 */
export function ensure<T>(value: T, messageOrName?: string): NonNullable<T> {
    assertIsDefined(value, messageOrName)
    return value
}

function createErrorMessage(messageOrName: string | undefined, config: CreateErrorMessageConfig) {
    if (!messageOrName) {
        return config.default
    }

    if (messageOrName.includes(' ')) {
        return config.message(messageOrName)
    }

    return config.name(messageOrName)
}
