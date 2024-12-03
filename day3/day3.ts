import readInput from "../utils/readInput";

function main() {
  const memory_data = readInput(__dirname);
  const part_one_regex = /mul\((\d+,\d+)\)/gi;

  const multiplications = [...memory_data.matchAll(part_one_regex)];
  const part_1_multiplication_sum = run_multiplications(multiplications);

  console.log(`answer for part 1: ${part_1_multiplication_sum}`);
}

function run_multiplications(multiplication_matches: string[][]) {
  return multiplication_matches.reduce((sum, match) => {
    const digits = match[1].split(",");

    sum += parseInt(digits[0]) * parseInt(digits[1]);

    return sum;
  }, 0);
}

main();
