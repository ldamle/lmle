import * as lle from '../../src/lle';
describe('InString functions', () => {
    test('should return an empty array when there are no connections', () => {
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            []
        );
        expect(connect.getArrayInString()).toEqual([]);
    });

    test('should return an array of connection names', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            [
                {name: 'A', element: elem, no_source: 1, is_out: false},
                {name: 'B', element: elem, no_source: 1, is_out: false}
            ]
        );
        expect(connect.getArrayInString()).toEqual(['A', 'B']);
    });

    test('should return the name of the matching element', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            [{name: 'A', element: elem, no_source: 1, is_out: false}]
        );
        expect(connect.findInString(elem)).toBe('A');
    });

    test('should return an empty string when no matching element is found', () => {
        const elem = new lle.Element();
        const anotherElem = new lle.Element();
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            [{name: 'A', element: elem, no_source: 1, is_out: false}]
        );
        expect(connect.findInString(anotherElem)).toBe('');
    });
});
