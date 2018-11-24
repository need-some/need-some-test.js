import stringify = require('json-stable-stringify');

/**
 * wrap any type to a named type to show intention.
 * Everything can be a object to be compared
 */
// tslint:disable-next-line: no-any // everything can be a object to be compared
type anyObject = any;

/**
 * Jasmine matcher to compare by json stringify.
 */
const toBeSameJsonMatcher: jasmine.CustomMatcherFactories = {
	/**
	 * Expect the given test object to be identical to the given expected object.
	 * The comparison is done on a json stringify. Please note that complex or recursive objects may not be compareable.
	 *
	 * @param expected The object to compare to
	 */
	toBeSameJson: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>) => {
		return {
			compare: (actual: anyObject, expected: anyObject): jasmine.CustomMatcherResult => {
				// do a sorted stringify of the objects
				const jsonActual = stringify(actual, { space: 2 });
				const jsonExpected = stringify(expected, { space: 2 });

				// compare the created strings
				const pass = jsonActual === jsonExpected;
				const result = {
					pass: pass,
					message: pass ? 'should not be identical' : jsonActual + '\n\nshould be identical to\n\n' + jsonExpected
				};

				return result;
			}
		};
	}
};

export { toBeSameJsonMatcher };

// add the matcher to a global beforeEach, so the matcher is available to jasmine spec tests
beforeEach(() => {
	jasmine.addMatchers(toBeSameJsonMatcher);
});
