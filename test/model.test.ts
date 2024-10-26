import * as lle from '@ldamle/lle';
import {Model} from '../src/model';
describe('Check getDataElementGraph', () => {
    lle.config.delay.setStandard(0.01);
    const g1 = new lle.Generator('g1', 1);
    const g2 = new lle.Generator('g2', 1);
    const g3 = new lle.Generator('g3', 1);
    const g4 = new lle.Generator('g4', 1);
    const e1 = new lle.Element('e1', ['A', 'B'], ['A', 'B', 'C'], ['000', '010', '101', '011']);
    const e2 = new lle.Element(
        'e2',
        ['A', 'B', 'C'],
        ['A', 'B'],
        ['00', '10', '01', '11', '11', '01', '10', '00']
    );
    const e3 = new lle.Element('e3', ['A', 'B'], ['A', 'B'], ['11', '10', '01', '00']);
    const e4 = new lle.Element(
        'e4',
        ['A', 'B', 'C', 'D'],
        ['A', 'B', 'C'],
        [
            '000',
            '001',
            '010',
            '011',
            '100',
            '101',
            '110',
            '111',
            '000',
            '001',
            '010',
            '011',
            '100',
            '101',
            '110',
            '111'
        ]
    );
    e1.in('A', g1.out());
    e1.in('B', g2.out());
    e2.in('A', e1.out('B'));
    e2.in('B', e1.out('C'));
    e2.in('C', g3.out());
    e3.in('A', e2.out('B'));
    e3.in('B', g4.out());
    e4.in('A', e1.out('A'));
    e4.in('B', e2.out('A'));
    e4.in('C', e3.out('A'));
    e4.in('D', e3.out('B'));

    const eg = new lle.ElementGraph(e1);
    const model = new Model(eg, 3);

    test('check getDataElementGraph', () => {
        console.log(e4.props.tet);
        console.log(model.exportConnection(e4.out('C')));
    });
});
