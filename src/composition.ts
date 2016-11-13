import * as _ from 'lodash';

export type Accidental = 'Natural' | 'Flat' | 'Sharp' | 'Double Flat' | 'Double Sharp';

export type Pitch = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface Note {
  accidental: Accidental;
  pitch: Pitch;
  octave: number;
}

// export interface Chord {
//   notes: Note[];
// }

// export interface Measure {
//   chords: Chord[];
// }

// The above definitions are better, but chords can be a future feature...
export interface Measure {
  notes: Note[];
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

//export const NOTES_REGEX = /notes ((((\d)+-?)+\/(\d))(|(((\d)+-?)+\/(\d)))*)/;

//export const NOTES_REGEX = /notes((\s+((\d+)\/(\d+)))+)/;

export const MEASURE_NOTES_REGEX = /notes(((\s*((\d+)\/(\d+))\s*)+\|?)+)/;

//export const NAIVE_NOTES_REGEX = 

// A 2-D of array representing the 6 strings and 24 frets of a guitar
export const STANDARD_TUNING_NOTES: Note[][] = [[
  {
    pitch: 'E',
    accidental: 'Natural',
    octave: 3
  },
  {
    pitch: 'F',
    accidental: 'Natural',
    octave: 3
  },
  {
    pitch: 'F',
    accidental: 'Sharp',
    octave: 3
  }, {
    pitch: 'G',
    accidental: 'Natural',
    octave: 3
  },
  {
    pitch: 'G',
    accidental: 'Sharp',
    octave: 3
  },
  {
    pitch: 'A',
    accidental: 'Natural',
    octave: 4
  },
  {
    pitch: 'A',
    accidental: 'Sharp',
    octave: 4
  },
  {
    pitch: 'B',
    accidental: 'Natural',
    octave: 4
  }, {
    pitch: 'C',
    accidental: 'Natural',
    octave: 4
  },
  {
    pitch: 'C',
    accidental: 'Sharp',
    octave: 4
  },
  {
    pitch: 'D',
    accidental: 'Natural',
    octave: 4,
  }, {
    pitch: 'D',
    accidental: 'Sharp',
    octave: 4
  }, {
    pitch: 'E',
    accidental: 'Natural',
    octave: 4
  }
]];

export const STRING_LENGTH = 24;
export const NUM_FRETS_PER_STRING = STRING_LENGTH;

export function parseNote(noteStr: string): Note {
  const [fretNum, stringNum] = noteStr.trim().split('/').map(str => parseInt(str, 10));

  const adjustedStringNum = 6 - stringNum;

  return STANDARD_TUNING_NOTES[adjustedStringNum][fretNum];
}

export function parseMeasureNotes(measureStr: string): Measure {
  const cleanMeasure = measureStr.trim();
  console.log('GOT MEASURE', cleanMeasure);

  const notes: Note[] = cleanMeasure.split(/\s/).map(noteStr => {
    return parseNote(noteStr);
  });

  return { notes };
}

export function parseMeasures(notes: string): Measure[] {
  const parse = notes.match(MEASURE_NOTES_REGEX);

  if (!parse) {
    throw new Error(`Could not parse \`${notes}\``);
  }

  const measures = parse[1].trim();
  console.log('MEASURES', measures);

  return measures.split('|').map(measureNotes => {
    return parseMeasureNotes(measureNotes);
  });
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