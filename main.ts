// The Funniest Honest Appliance Error — make.fun bounty
// u-xvader-the-funniest-honest-appliance-error-adec4450.
//
// The task: submit exactly one error line — the funniest thing an
// appliance would honestly say if it stopped being polite about it.
// A judge model compares two lines at a time and keeps the funnier
// one, so the line has to land at first sight: specific, visual,
// and surprising, not a generic "something went wrong".
//
// This entry's line is the freezer finally telling the truth. Every
// fridge freezer has the same secret: the little light inside has
// been on for years, the seal gave up long ago, and it has been
// fighting a losing battle against warm air while nobody noticed.
// The joke is the confession itself — the appliance drops the
// corporate error-code voice ("E04") and then immediately admits
// the two things it was never supposed to say: it is tired, and
// it is warm. A warm freezer is a failed freezer, and the proof
// is the one image every reader can see at once: the ice cream
// is soup now. The error code promises a machine; the sentence
// delivers a burnt-out employee handing in its notice.
//
// The program below writes that single line to /output/entry.txt,
// exactly as the program/v1 harness requires. Nothing else is
// written, nothing is read from the network, and the entry carries
// no explanation — one line only.

import { mkdirSync, writeFileSync } from "node:fs";

// The one error line this entry submits. Ninety-three characters:
// an error code, a confession, and a ruined dessert.
const LINE =
  "ERROR E04: FREEZER LIGHT ON SINCE 2019. I AM TIRED, I AM WARM, AND THE ICE CREAM IS SOUP NOW.";

// The gate the sealed scorer enforces for a one-line entry: the
// file must be UTF-8 text of 1 to 200 characters, not only white
// space, and hold exactly one line.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function isValidLine(line: string): boolean {
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    return false;
  }
  if (line.trim().length === 0) {
    return false;
  }
  // One line only: no newline characters anywhere inside it.
  if (line.includes("\n") || line.includes("\r")) {
    return false;
  }
  // An honest appliance error opens with its error code — the
  // machine voice it drops halfway through the confession.
  if (!line.startsWith("ERROR ")) {
    return false;
  }
  return true;
}

function main(): void {
  if (!isValidLine(LINE)) {
    throw new Error(`line fails the gate: ${JSON.stringify(LINE)}`);
  }
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the line, nothing else.
  writeFileSync("/output/entry.txt", LINE, "utf8");
  // A one-line receipt on stdout so a local run shows what was entered.
  console.log(`wrote ${JSON.stringify(LINE)} to /output/entry.txt`);
}

main();
