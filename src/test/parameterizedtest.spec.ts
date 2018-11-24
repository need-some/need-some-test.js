import { pdescribe, fpdescribe, xpdescribe, pit, fpit, xpit } from '../module/parameterizedtest';

function wrapTest(calls, body: () => void) {
	const backDescribe = (<any>window).describe;
	const backFDescribe = (<any>window).fdescribe;
	const backXDescribe = (<any>window).xdescribe;
	const backIt = (<any>window).it;
	const backFIt = (<any>window).fit;
	const backXIt = (<any>window).xit;

	(<any>window).describe = function(title: string, f: () => void) {
		calls.push({ type: 'describe', title: title });
		f();
	};
	(<any>window).fdescribe = function(title: string, f: () => void) {
		calls.push({ type: 'fdescribe', title: title });
		f();
	};
	(<any>window).xdescribe = function(title: string, f: () => void) {
		calls.push({ type: 'xdescribe', title: title });
		f();
	};
	(<any>window).it = function(title: string, f: () => void) {
		calls.push({ type: 'it', title: title });
		f();
	};
	(<any>window).fit = function(title: string, f: () => void) {
		calls.push({ type: 'fit', title: title });
		f();
	};
	(<any>window).xit = function(title: string, f: () => void) {
		calls.push({ type: 'xit', title: title });
		f();
	};
	body();
	(<any>window).describe = backDescribe;
	(<any>window).fdescribe = backFDescribe;
	(<any>window).xdescribe = backXDescribe;
	(<any>window).it = backIt;
	(<any>window).fit = backFIt;
	(<any>window).xit = backXIt;
	return calls;
}

describe('Parameterized Test', () => {
	const params = [
		{
			title: 'test1',
			arg1: 1
		},
		{
			title: 'test2',
			arg1: 2
		},
		{
			fit: true,
			title: 'test3 forced',
			arg1: 3
		},
		{
			xit: true,
			title: 'test4 skipped',
			arg1: 4
		},
		{
			xit: true,
			fit: true,
			title: 'test5 skipped',
			arg1: 5
		}
	];
	const paramsWithoutTitle = [{ arg1: 1 }];
	describe('pdescribe', () => {
		it('should call describe for parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				pdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[0].type).toBe('describe');
			expect(calls[0].title).toBe('describe test1');
			expect(calls[1]).toBe(1);
			expect(calls[2].type).toBe('describe');
			expect(calls[2].title).toBe('describe test2');
			expect(calls[3]).toBe(2);
		});
		it('should call fdescribe for forced parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				pdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[4].type).toBe('fdescribe');
			expect(calls[4].title).toBe('describe test3 forced');
			expect(calls[5]).toBe(3);
		});
		it('should call xdescribe for skipped parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				pdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[6].type).toBe('xdescribe');
			expect(calls[6].title).toBe('describe test4 skipped');
			expect(calls[7]).toBe(4);
			expect(calls[8].type).toBe('xdescribe');
			expect(calls[8].title).toBe('describe test5 skipped');
			expect(calls[9]).toBe(5);
		});
	});
	describe('fpdescribe', () => {
		it('should call fdescribe for describe parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				fpdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[0].type).toBe('fdescribe');
			expect(calls[0].title).toBe('describe test1');
			expect(calls[1]).toBe(1);
			expect(calls[2].type).toBe('fdescribe');
			expect(calls[2].title).toBe('describe test2');
			expect(calls[3]).toBe(2);
		});
		it('should call fdescribe for forced parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				fpdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[4].type).toBe('fdescribe');
			expect(calls[4].title).toBe('describe test3 forced');
			expect(calls[5]).toBe(3);
		});
		it('should call xdescribe for skipped parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				fpdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[6].type).toBe('xdescribe');
			expect(calls[6].title).toBe('describe test4 skipped');
			expect(calls[7]).toBe(4);
			expect(calls[8].type).toBe('xdescribe');
			expect(calls[8].title).toBe('describe test5 skipped');
			expect(calls[9]).toBe(5);
		});
	});
	describe('xpdescribe', () => {
		it('should call xdescribe for describe parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				xpdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[0].type).toBe('xdescribe');
			expect(calls[0].title).toBe('describe test1');
			expect(calls[1]).toBe(1);
			expect(calls[2].type).toBe('xdescribe');
			expect(calls[2].title).toBe('describe test2');
			expect(calls[3]).toBe(2);
		});
		it('should call xdescribe for forced parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				xpdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[4].type).toBe('xdescribe');
			expect(calls[4].title).toBe('describe test3 forced');
			expect(calls[5]).toBe(3);
		});
		it('should call xdescribe for skipped parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				xpdescribe('describe ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[6].type).toBe('xdescribe');
			expect(calls[6].title).toBe('describe test4 skipped');
			expect(calls[7]).toBe(4);
			expect(calls[8].type).toBe('xdescribe');
			expect(calls[8].title).toBe('describe test5 skipped');
			expect(calls[9]).toBe(5);
		});
	});
	describe('pit', () => {
		it('should call it for parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[0].type).toBe('it');
			expect(calls[0].title).toBe('it test1');
			expect(calls[1]).toBe(1);
			expect(calls[2].type).toBe('it');
			expect(calls[2].title).toBe('it test2');
			expect(calls[3]).toBe(2);
		});
		it('should call fit for forced parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[4].type).toBe('fit');
			expect(calls[4].title).toBe('it test3 forced');
			expect(calls[5]).toBe(3);
		});
		it('should call xit for skipped parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[6].type).toBe('xit');
			expect(calls[6].title).toBe('it test4 skipped');
			expect(calls[7]).toBe(4);
			expect(calls[8].type).toBe('xit');
			expect(calls[8].title).toBe('it test5 skipped');
			expect(calls[9]).toBe(5);
		});
	});
	describe('fpit', () => {
		it('should call fit for describe parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				fpit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[0].type).toBe('fit');
			expect(calls[0].title).toBe('it test1');
			expect(calls[1]).toBe(1);
			expect(calls[2].type).toBe('fit');
			expect(calls[2].title).toBe('it test2');
			expect(calls[3]).toBe(2);
		});
		it('should call fit for forced parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				fpit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[4].type).toBe('fit');
			expect(calls[4].title).toBe('it test3 forced');
			expect(calls[5]).toBe(3);
		});
		it('should call xit for skipped parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				fpit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[6].type).toBe('xit');
			expect(calls[6].title).toBe('it test4 skipped');
			expect(calls[7]).toBe(4);
			expect(calls[8].type).toBe('xit');
			expect(calls[8].title).toBe('it test5 skipped');
			expect(calls[9]).toBe(5);
		});
	});
	describe('xpit', () => {
		it('should call xit for it parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				xpit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[0].type).toBe('xit');
			expect(calls[0].title).toBe('it test1');
			expect(calls[1]).toBe(1);
			expect(calls[2].type).toBe('xit');
			expect(calls[2].title).toBe('it test2');
			expect(calls[3]).toBe(2);
		});
		it('should call xit for forced parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				xpit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[4].type).toBe('xit');
			expect(calls[4].title).toBe('it test3 forced');
			expect(calls[5]).toBe(3);
		});
		it('should call xit for skipped parameters', () => {
			const calls = [];
			wrapTest(calls, () =>
				xpit('it ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls.length).toBe(10);
			expect(calls[6].type).toBe('xit');
			expect(calls[6].title).toBe('it test4 skipped');
			expect(calls[7]).toBe(4);
			expect(calls[8].type).toBe('xit');
			expect(calls[8].title).toBe('it test5 skipped');
			expect(calls[9]).toBe(5);
		});
	});

	describe('formatTestTitle', () => {
		it('should return unparametrized title', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit('not parameterized', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('not parameterized');
		});
		it('should return replaced title', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit('The test with title ${title}', params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('The test with title test1');
		});
		it('should return title arrow result', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit((param, title) => title, params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('test1');
		});
		it('should return function result', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit(
					function(param, title) {
						return title + ' ' + param.arg1;
					},
					params,
					param => {
						calls.push(param.arg1);
					}
				)
			);
			expect(calls[0].title).toBe('test1 1');
		});
		it('should return arrow result', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit((param, title) => title + ' ' + param.arg1, params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('test1 1');
		});
		it('should return template result', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit((param, title) => `The test with title ${title} and param ${param.arg1}`, params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('The test with title test1 and param 1');
		});
		it('should return template result with single param', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit(p => `The test with title ${p.title} and param ${p.arg1}`, params, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('The test with title test1 and param 1');
		});
		it('should create param title without title', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit(p => `The test with only an param key ${p.arg1}`, paramsWithoutTitle, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('The test with only an param key 1');
		});
		it('should create param title with undefined title', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit(undefined, paramsWithoutTitle, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('');
		});
		it('should create param title with undefined title', () => {
			const calls = [];
			wrapTest(calls, () =>
				pit('no ${title}', paramsWithoutTitle, param => {
					calls.push(param.arg1);
				})
			);
			expect(calls[0].title).toBe('no ');
		});
	});
});
