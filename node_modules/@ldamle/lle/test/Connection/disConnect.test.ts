import * as lle from '../../src/lle';
describe('Check function inConnect', () => {
    test('Check disconnection', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            {name: 'A', element: elem, no_source: 1, is_out: false}
        );
        connect.disConnect({name: 'A', element: elem, no_source: 1, is_out: false});
        expect(connect.in).toEqual(false);
    });

    test('Check disconnection array', () => {
        const elem = new lle.Element();
        const connect = new lle.Connection(
            {name: 'A', element: new lle.Element(), no_source: 1, is_out: true},
            [
                {name: 'A', element: elem, no_source: 1, is_out: false},
                {name: 'B', element: elem, no_source: 1, is_out: false},
                {name: 'C', element: elem, no_source: 1, is_out: false}
            ]
        );
        connect.disConnects([
            {name: 'A', element: elem, no_source: 1, is_out: false},
            {name: 'B', element: elem, no_source: 1, is_out: false}
        ]);
        expect(connect.in).toEqual([{name: 'C', element: elem, no_source: 1, is_out: false}]);
    });
});
