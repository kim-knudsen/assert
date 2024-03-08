import { assertEquals, assertInstanceOf, assertIsError, assertThrows } from 'jsr:@std/assert'
import { AssertionError, assertIsDefined, assertTruthy } from './mod.ts'

Deno.test('assertTruthy', () => {
    assertThrows(() => assertTruthy(false))
    assertThrows(() => assertTruthy(undefined))
    assertThrows(() => assertTruthy(null))
    assertThrows(() => assertTruthy(''))
    assertTruthy(' ', 'Should not throw as value is truthy')
})

Deno.test('assertIsDefined', () => {
    assertIsDefined(false, 'Should not throw as value is defined')
    assertThrows(() => assertIsDefined(undefined))
    assertThrows(() => assertIsDefined(null))
})

Deno.test('Message or name', () => {
    try {
        assertTruthy(false)
    } catch (error) {
        assertIsError(error)
        assertInstanceOf(error, AssertionError)
        assertEquals(error.message, 'Expected a truthy value, but received: false')
    }

    try {
        assertTruthy(false, 'Custom message')
    } catch (error) {
        assertIsError(error)
        assertInstanceOf(error, AssertionError)
        assertEquals(error.message, 'Custom message')
    }

    try {
        assertIsDefined(undefined, 'myValue')
    } catch (error) {
        assertIsError(error)
        assertInstanceOf(error, AssertionError)
        assertEquals(error.message, 'Expected "myValue" to be defined')
    }
})
