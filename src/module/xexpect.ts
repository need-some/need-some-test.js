// tslint:disable-next-line: no-any // everything can be a object to be compared
export type anyObject = any;

/**
 * Extend jasmine matcher type
 * TODO: remove and add type enhancement instead
 */
export interface XMatchers<T> extends jasmine.Matchers<T> {
	not: XMatchers<T>;
	toBeSameJson(expected: T): boolean;
}

/**
 * Extend jasmine extend function
 * TODO: remove and add type enhancement instead
 */
export function xexpect<T>(actual: anyObject): XMatchers<T> {
	return <XMatchers<T>>expect(actual);
}
