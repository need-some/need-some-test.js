# need-some-test.js
[![Build Status](https://travis-ci.org/need-some/need-some-test.js.svg?branch=master)](https://travis-ci.org/need-some/need-some-test.js)

_need-some_ is a collection of small yet useful functions.
The test package is a unit testing extension for javascript and typescript.

## Installation
Simply install as dev dependency


	npm install @need-some/test --save-dev

## Jasmine

### Parameterized tests
Suites defined by describe or tests defined by it can be parameterized using the corresponding pdescribe or pit with an array of parameters.

#### Usage
Simple example in Typescript:

	import { pit } from '@need-some/test/parameterizedtest';
	
	describe('Sample', () => {
		const params = [
			{
				title: 'identical numbers',
				a: 1,
				b: 1
			}, {
				title: 'different numbers',
				a: 1,
				b: 2
			}
		];
		pit('should compute less or equals for ${title}', params, (param) => {
			expect(param.a <= param.b).toBeTruthy();
		});
	});

Similar to the Jasmine it and describe, the tests can be focussed with a prefix f or skipped using the prefix x. The modifier is applied to all parameters.

#### Parameterized Unit Test with pit / fpit / xpit

pit creates an unit test for each parameter. The title of each test is produced by replacing ${title} by the title of each param.

	pit(title: string, params: S[], assertion: (S)=> void, timeout?: number): void

All generated tests can be focussed by using fpit. All generated tests are added to the set of focussed tests.

	fpit(title: string, params: S[], assertion: (S)=> void, timeout?: number): void

All generated tests are set pending by using xpit. The tests will not be executed.

	xpit(title: string, params: S[], assertion: (S)=> void, timeout?: number): void


#### Parameterized Suite with pdescribe / fpdescribe / xpdescribe

pdescribe creates suits for each parameter. The title of each suite is produced by replacing ${title} by the title of each param.

	pdescribe(title: string, params: S[], tests: (S)=> void): void

All generated suits can be focussed by using fpdescribe. All contained tests in these suits are added to the set of focussed tests.

	fpdescribe(title: string, params: S[], tests: (S)=> void): void

All generated suits are set pending by using xpdescribe. All contained tests are marked pending as well and not executed.

	xpdescribe(title: string, params: S[], tests: (S)=> void): void

#### Set parameters to focussed or pending

Single parameters can also be set to focussed or pending by setting a flag fit or xit in the parameter

	const params = [
		{
			fit: true,
			title: 'identical numbers',
			a: 1,
			b: 1
		}, {
			title: 'different numbers',
			a: 1,
			b: 2
		}, {
			xit: true,
			title: 'different numbers in unexpected order',
			a: 2,
			b: 1
		}
	];

If both xit and fit are set, the test is marked pending (the fit is ignored)

If focussed params, tests or suites are nested within pending suits, the result may not be exactly as expected. 

#### Title generation

The title of a suite or test is either created by replacing ${title} by the parameter title or calling a function given in the test definition.

	'The test with title ${title}'

If parameters are necessary, a function may be used to create the string

	function(param, title) { return title + ' '+param.arg1; }
	
Of course arrow functions are also fine

	(param, title) => title + ' ' + param.arg1

This can also be used with template strings to be even shorter

	(param, title) => `The test with title ${title} and param ${param.arg}`

The title is contained in the param object, so the second parameter of the function is optional

	p => `The test with title ${p.title} and param ${p.arg}`
