import { mapYOEHelper } from '@/lib/helpers/formHelpers';

describe('mapYOEHelper', () => {
  it('should map 0-2 to 0-2', () => {
    const yoe = ['0-2'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['0-2']);
  });

  it('should map 2-4 to 3-5', () => {
    const yoe = ['2-4'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['3-5']);
  });

  it('should map 3-5 to 3-5', () => {
    const yoe = ['3-5'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['3-5']);
  });

  it('should map 4-8 to 3-5 and 6-8', () => {
    const yoe = ['4-8'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['3-5', '6-8']);
  });

  it('should map 6-8 to 6-8', () => {
    const yoe = ['6-8'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['6-8']);
  });

  it('should map 8-12 to 9-12', () => {
    const yoe = ['8-12'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['9-12']);
  });

  it('should map 9-12 to 9-12', () => {
    const yoe = ['9-12'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['9-12']);
  });

  it('should map 12-15 to 13-15', () => {
    const yoe = ['12-15'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['13-15']);
  });

  it('should map 13-15 to 13-15', () => {
    const yoe = ['13-15'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['13-15']);
  });

  it('should map 15+ to 15+', () => {
    const yoe = ['15+'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['15+']);
  });

  it('should map [0-2, 2-4, 4-8, 8-12, 12-15, 15+] to [0-2, 3-5, 6-8, 9-12, 13-15, 15+]', () => {
    const yoe = ['0-2', '2-4', '4-8', '8-12', '12-15', '15+'];
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(['0-2', '3-5', '6-8', '9-12', '13-15', '15+']);
  });

  it('should return undefined if undefined is passed in', () => {
    const yoe = undefined;
    const expected = mapYOEHelper(yoe);
    expect(expected).eql(undefined);
  });
});
