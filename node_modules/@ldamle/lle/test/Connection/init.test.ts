import * as lle from '../../src/lle';
describe('Check constructor', () => {
    test('Check constructor with out', () => {
        const connect = new lle.Connection({
            name: 'A',
            element: new lle.Element(),
            no_source: 1,
            is_out: true
        });
        expect(connect.out.name).toEqual('A');
    });

    test('Check constructor with in', () => {
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            {name: 'B', element: new lle.Element(), no_source: 1, is_out: false}
        );
        expect(connect.out.name).toEqual('A');
        expect((connect.in as lle.Types.source.array)[0].name).toEqual('B');
    });

    test('Check constructor with Array in', () => {
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            [
                {name: 'B', element: new lle.Element(), no_source: 1, is_out: false},
                {name: 'C', element: new lle.Element(), no_source: 1, is_out: false},
                {name: 'D', element: new lle.Element(), no_source: 1, is_out: false}
            ]
        );
        expect(connect.out.name).toEqual('A');
        expect((connect.in as lle.Types.source.array)[0].name).toEqual('B');
    });
});
