import * as Composition from './composition';
import * as FS from 'fs';

function main(): void {
  const inFileName = process.argv[2];
  const outFileName = process.argv[3];

  if (!inFileName || !outFileName) {
    throw new Error('Usage: `node dist/main.js <infile> <outfile>`');
  }

  FS.readFile(inFileName, 'utf8', (inErr, input) => {
    if (inErr) {
      console.error('INPUT ERROR!');
      throw inErr;
    }

    const composition = Composition.parseVexTab(input);

    const output = Composition.compositionToSonicPi(composition);

    FS.writeFile(outFileName, output, (outErr) => {
      if (outErr) {
        console.error('OUTPUT ERROR!');
        throw outErr;
      }

      console.log('DONE!');
    });
  });
}

// Check that main should be run
if (!module.parent) {
  main();
}