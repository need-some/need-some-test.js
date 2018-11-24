import { toBeSameJsonMatcher } from '../module/tobesamejson';
import { pit, fpit } from '../module/parameterizedtest';
import { xexpect } from '../module/xexpect';

describe('toBeSameJsonMatcher', () => {
	const params = [
		{
			title: 'undefined',
			expected: true,
			input: <any>undefined,
			compare: <any>undefined
		},
		{
			title: 'simple objects',
			expected: true,
			input: { a: 1 },
			compare: { a: 1 }
		},
		{
			title: 'empty objects',
			expected: true,
			input: {},
			compare: {}
		},
		{
			title: 'different values',
			expected: false,
			input: { a: 1 },
			compare: { a: 2 }
		},
		{
			title: 'empty and not empty objects',
			expected: false,
			input: {},
			compare: { a: 1 }
		},
		{
			title: 'empty objects and empty array',
			expected: false,
			input: {},
			compare: []
		},
		{
			title: 'nested objects',
			expected: true,
			input: { a: { b: 1 } },
			compare: { a: { b: 1 } }
		},
		{
			title: 'different nested values',
			expected: false,
			input: { a: { b: 1 } },
			compare: { a: { b: 2 } }
		},
		{
			title: 'different nested keys',
			expected: false,
			input: { a: { b: 1 } },
			compare: { a: { c: 1 } }
		},
		{
			title: 'arrays',
			expected: true,
			input: [{ a: { b: 1 } }, { a: { b: 2 } }],
			compare: [{ a: { b: 1 } }, { a: { b: 2 } }]
		},
		{
			title: 'nested arrays',
			expected: true,
			input: { a: [{ b: 1 }, { b: 2 }] },
			compare: { a: [{ b: 1 }, { b: 2 }] }
		},
		{
			title: 'different array size',
			expected: false,
			input: { a: [{ b: 1 }, { b: 2 }] },
			compare: { a: [{ b: 1 }] }
		},
		{
			title: 'different array order',
			expected: false,
			input: { a: [{ b: 1 }, { b: 2 }] },
			compare: { a: [{ b: 2 }, { b: 1 }] }
		},
		{
			title: 'different array initialization',
			expected: false,
			input: { a: { 0: { b: 1 }, 1: { b: 2 } } },
			compare: { a: [{ b: 1 }, { b: 2 }] }
		},
		{
			title: 'primitive',
			expected: true,
			input: 1,
			compare: 1
		},
		{
			title: 'different primitive',
			expected: false,
			input: 1,
			compare: 2
		},
		{
			title: 'different primitive types',
			expected: false,
			input: 1,
			compare: '1'
		}
	];
	pit('should accept ${title}', params.filter(p => p.expected), param => {
		xexpect(param.input).toBeSameJson(param.compare);
	});
	pit('should decline ${title}', params.filter(p => !p.expected), param => {
		xexpect(param.input).not.toBeSameJson(param.compare);
	});
});
