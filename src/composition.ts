import * as _ from 'lodash';

export type Accidental = 'Natural' | 'Flat' | 'Sharp' | 'Double Flat' | 'Double Sharp';

export type Pitch = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface Note {
  accidental: Accidental;
  pitch: Pitch;
}

export interface Chord {
  notes: Note[];
}

export interface Measure {
  chords: Chord[];
}

export type GuitarTuning = 'Standard';

export interface TimeSignature {
  beatNote: number;
  beatsPerMeasure: number;
}

export type Clef = 'Treble' | 'Alto' | 'Tenor' | 'Bass' | 'Percussion';

export type Key = 'C' | 'Am' | 'F' | 'Dm' | 'Bb' | 'Gm' | 'Eb' | 'Cm'| 'Ab' 
| 'Fm' | 'Db' | 'Bbm' | 'Gb' | 'Ebm' | 'Cb' | 'Abm' | 'G' | 'Em' | 'D' | 'Bm' 
| 'A' | 'F#m' | 'E' | 'C#m' | 'B' | 'G#m' | 'F#' | 'D#m' | 'C#' | 'A#m';

export interface TabStave {
  notation: boolean;
  tablature: boolean;
  measures: Measure[];
  clef: Clef;
  key: Key;
  time: TimeSignature;
  tuning: GuitarTuning;
}

export const DEFAULT_TAB_STAVE: TabStave = {
  notation: true,
  tablature: true,
  measures: [],
  clef: 'Treble',
  key: 'C',
  time: {
    beatNote: 4,
    beatsPerMeasure: 4
  },
  tuning: 'Standard'
};

export interface Composition {
  tabStaves: TabStave[];
}

//export const HEADER_REGEXP: RegExp = /tabstave((notation=(true)|(false)))*/

export function parseMeasures(notes: string): Measure[] {
  return [];
}

export function parseTabStave(tabStaveHeaderLine: string, noteLine: string): TabStave {
  console.log('Got lines: ', tabStaveHeaderLine, '\n', noteLine);
  const cleanHeader = tabStaveHeaderLine.trim();
  const cleanNotes = noteLine.trim();

  const myTabStave = _.extend({}, DEFAULT_TAB_STAVE); // TODO: parse header

  const measures = parseMeasures(cleanNotes);

  myTabStave.measures = measures;

  return myTabStave;
}

export function parseVexTab(vexTab: string): Composition {
  const lines = vexTab.trim().split('\n');

  const tabStaveLinePairs = _.chunk(lines, 2);

  return {
    tabStaves: tabStaveLinePairs.map(([tabStaveHeaderLine, noteLine]) => {
      return parseTabStave(tabStaveHeaderLine, noteLine);
    })
  };
}

export function compositionToSonicPi(composition: Composition): string {
  return '';
}