/**
 * Common interfaced for test parameters
 */
export interface TestParam {
	/**
	 * The title of a test using this parameter (${title} in the test name is replaced by this title)
	 */
	title?: string;

	/**
	 * Set to true to force this parameter
	 */
	fit?: boolean;

	/**
	 * Set to true to skip this parameter
	 */
	xit?: boolean;
}

export type TitleFunction<S> = ((p: S, title: string | undefined) => string) | string | undefined;

function formatTestTitle<S>(title: TitleFunction<S>, param: S) {
	if (title === undefined) {
		return '';
	} else if (typeof title === 'string') {
		const testParam = <TestParam>param;
		return title.replace('${title}', testParam.title !== undefined ? testParam.title : '');
	} else {
		return title(param, (<TestParam>param).title);
	}
}

/**
 * Call a test with the given parameters
 * @param expectation Textual description of what this spec is checking. ${title} is replaced by the parameter name
 * @param params The parameters for this test execution
 * @param assertion Function that contains the code of your test.
 * @param timeout Custom timeout for an async spec.
 */
export function pit<S>(expectation: TitleFunction<S>, params: S[], assertion: (param: S) => void, timeout?: number) {
	params.forEach(param => {
		if ((<TestParam>param).xit) {
			xit(formatTestTitle(expectation, param), () => assertion(param), timeout);
		} else if ((<TestParam>param).fit) {
			fit(formatTestTitle(expectation, param), () => assertion(param), timeout);
		} else {
			it(formatTestTitle(expectation, param), () => assertion(param), timeout);
		}
	});
}

/**
 * Call a focussed test with the given parameters.
 * If suites or specs are focused, only those that are focused will be executed.
 * @param expectation Textual description of what this spec is checking. ${title} is replaced by the parameter name
 * @param params The parameters for this test execution
 * @param assertion Function that contains the code of your test.
 * @param timeout Custom timeout for an async spec.
 */
export function fpit<S>(expectation: TitleFunction<S>, params: S[], assertion: (param: S) => void, timeout?: number) {
	params.forEach(param => {
		if ((<TestParam>param).xit) {
			xit(formatTestTitle(expectation, param), () => assertion(param), timeout);
		} else {
			fit(formatTestTitle(expectation, param), () => assertion(param), timeout);
		}
	});
}

/**
 * Mark a spec as pending, expectation results will be ignored.
 * If suites or specs are focused, only those that are focused will be executed.
 * @param expectation Textual description of what this spec is checking. ${title} is replaced by the parameter name
 * @param params The parameters for this test execution
 * @param assertion Function that contains the code of your test.
 * @param timeout Custom timeout for an async spec.
 */
export function xpit<S>(expectation: TitleFunction<S>, params: S[], assertion: (param: S) => void, timeout?: number) {
	params.forEach(param => {
		xit(formatTestTitle(expectation, param), () => assertion(param), timeout);
	});
}

/**
 * Create a parameterized group of specs (often called a suite).
 * @param description Textual description of the group. ${title} is replaced by the parameter name
 * @param params The parameters for this test execution
 * @param specDefinitions Function for Jasmine to invoke that will define inner suites a specs
 */
export function pdescribe<S>(description: TitleFunction<S>, params: S[], specDefinitions: (param: S) => void) {
	params.forEach(param => {
		if ((<TestParam>param).xit) {
			xdescribe(formatTestTitle(description, param), () => specDefinitions(param));
		} else if ((<TestParam>param).fit) {
			fdescribe(formatTestTitle(description, param), () => specDefinitions(param));
		} else {
			describe(formatTestTitle(description, param), () => specDefinitions(param));
		}
	});
}

/**
 * Create a focussed parameterized group of specs (often called a suite). All groups and tests within this group will be marked focussed.
 * @param description Textual description of the group. ${title} is replaced by the parameter name
 * @param params The parameters for this test execution
 * @param specDefinitions Function for Jasmine to invoke that will define inner suites a specs
 */
export function fpdescribe<S>(description: TitleFunction<S>, params: S[], specDefinitions: (param: S) => void) {
	params.forEach(param => {
		if ((<TestParam>param).xit) {
			xdescribe(formatTestTitle(description, param), () => specDefinitions(param));
		} else {
			fdescribe(formatTestTitle(description, param), () => specDefinitions(param));
		}
	});
}

/**
 * Create a pending group of specs (often called a suite). All groups and tests within this group will be marked pending.
 * @param description Textual description of the group. ${title} is replaced by the parameter name
 * @param params The parameters for this test execution
 * @param specDefinitions Function for Jasmine to invoke that will define inner suites a specs
 */
export function xpdescribe<S>(description: TitleFunction<S>, params: S[], specDefinitions: (param: S) => void) {
	params.forEach(param => {
		xdescribe(formatTestTitle(description, param), () => specDefinitions(param));
	});
}
