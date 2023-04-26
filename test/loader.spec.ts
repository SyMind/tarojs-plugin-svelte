import taroSvelteLoader from '../lib/taroSvelteLoader'

jest.mock('@tarojs/webpack5-runner/dist/utils/component', () => ({
    componentConfig: {
        includes: new Set()
    }
}))

function testLoader(source: string, callback: (err: Error | null, code: string, map: string) => void) {
    return done => {
        const addedDependencies = new Set();

        function cb(...args) {
            while (args.length < 4) {
                args.push(undefined);
            }
            args.push(addedDependencies);
            try {
                // @ts-ignore
                callback(...args);
            } catch (err) {
                expect(callbackSpy).toBeCalled();
                return done(err);
            }
            expect(callbackSpy).toBeCalled();
            done();
        }

        const cacheableSpy = jest.fn();

        const callbackSpy = jest.fn(cb);

        const dependencySpy = jest.fn(function(p) { addedDependencies.add(p); });

        taroSvelteLoader.call(
            {
                cacheable: cacheableSpy,
                async: () => callbackSpy,
                addDependency: dependencySpy,
                resourcePath: '<nil>'
            },
            source,
            null
        );

        expect(cacheableSpy).toBeCalled();

        for (const call of dependencySpy.mock.calls) {
            expect(typeof call[0]).toBe('string')
        }
    };
}

describe('mini program', () => {
    beforeAll(() => {
        process.env.TARO_ENV = 'weapp'
    })

    afterAll(() => {
        process.env.TARO_ENV = undefined
    })

    it('should compile', testLoader(
        '<t-view>hello, world</t-view>',
        function(err, code, map) {
            expect(err).toBeFalsy();
            expect(code).toBeTruthy();
            expect(map).toBeTruthy();
            expect(code).toMatchSnapshot();
        }
    ))
})

describe('h5', () => {
    beforeAll(() => {
        process.env.TARO_ENV = 'h5'
    })

    afterAll(() => {
        process.env.TARO_ENV = undefined
    })

    it('should compile', testLoader(
        '<t-view>hello, world</t-view>',
        function(err, code, map) {
            expect(err).toBeFalsy();
            expect(code).toBeTruthy();
            expect(map).toBeTruthy();
            expect(code).toMatchSnapshot();
        }
    ))
})
