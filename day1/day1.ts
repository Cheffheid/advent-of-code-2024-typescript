import * as fs from "fs";

function main() {
  const data = formatData(readInput());

  const distance = get_distance_from_pairs(data);
  console.log(`answer for part 1: ${distance}`);
}

function readInput() {
  const input = `${__dirname}/input.txt`;
  return fs.readFileSync(input, { encoding: "utf8", flag: "r" });
}

/**
 * Format the data from the string that readFileSync returns into something we can use to solve today's puzzles.
 * @param data
 * @returns
 */
function formatData(data: string) {
  return create_pairs_array(split_lines_and_sort(data));
}

/**
 * Create two lists of ids, sort them, and return them as a combined array.
 * @param data String of input.txt content.
 * @returns array
 */
function split_lines_and_sort(data: string) {
  const left_side: number[] = [];
  const right_side: number[] = [];

  data.split(/\r?\n/).forEach(function (line) {
    const ids = line.split(/\s+/);

    left_side.push(parseInt(ids[0]));
    right_side.push(parseInt(ids[1]));
  });

  left_side.sort();
  right_side.sort();

  return [left_side, right_side];
}

/**
 * Combine two arrays into a single array of id pairs.
 * @param data Arrays of ids that need to be combined into a single id pairs array.
 * @returns array
 */
function create_pairs_array(data: number[][]) {
  const id_pairs = data[0].map(function (left_side_number, index) {
    return [left_side_number, data[1][index]];
  });

  return id_pairs;
}

/**
 * Calculate the sum of the distances of each id pair to get the answer for part 1.
 * @param pairs Nested array of id pair arrays.
 * @returns number
 */
function get_distance_from_pairs(pairs: number[][]) {
  let distance = 0;

  pairs.forEach(function (id_pair) {
    distance += Math.abs(id_pair[0] - id_pair[1]);
  });

  return distance;
}

main();
