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

export interface Composition {
  tabStaves: TabStave[];
}

export function parseVexTab(vexTab: string): Composition {
  return {tabStaves: []};
}

export function compositionToSonicPi(composition: Composition): string {
  return '';
}