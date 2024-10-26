import * as lle from '../../src/lle';
import * as Types from '../../src/types';
describe('Check findElement functions', () => {
    const g1 = new lle.Generator('g1', 1);
    const g2 = new lle.Generator('g2', 2);
    const g3 = new lle.Generator('g3', 3);
    const g4 = new lle.Generator('g4', 4);
    const e1 = new lle.Element('e1', ['A', 'B'], ['A', 'B', 'C'], []);
    const e2 = new lle.Element('e2', ['A', 'B', 'C'], ['A', 'B'], []);
    const e3 = new lle.Element('e3', ['A', 'B'], ['A', 'B'], []);
    const e4 = new lle.Element('e4', ['A', 'B', 'C', 'D'], ['A', 'B', 'C'], []);
    const e5 = new lle.Element('e5');
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
    const eg = new lle.ElementGraph(e2);

    test('check findElement with generators', () => {
        expect((eg.findElement(g1) as Types.elementGraph.node).element).toEqual(g1);
        expect((eg.findElement(g2) as Types.elementGraph.node).element).toEqual(g2);
        expect((eg.findElement(g3) as Types.elementGraph.node).element).toEqual(g3);
        expect((eg.findElement(g4) as Types.elementGraph.node).element).toEqual(g4);
    });

    test('check findElement with elements', () => {
        expect((eg.findElement(e1) as Types.elementGraph.node).element).toEqual(e1);
        expect((eg.findElement(e2) as Types.elementGraph.node).element).toEqual(e2);
        expect((eg.findElement(e3) as Types.elementGraph.node).element).toEqual(e3);
        expect((eg.findElement(e4) as Types.elementGraph.node).element).toEqual(e4);
        expect(eg.findElement(e5)).toEqual(false);
    });
});
