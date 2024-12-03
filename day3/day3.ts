import readInput from "../utils/readInput";

function main() {
  const memory_data = readInput(__dirname);

  /**
   * Use a regex to find any instance of mul(digits,digits) in the memory string:
   * mul\( matches "mul("
   * ( starts a capture group
   * \d+,\d+ matches any comma separated pair of one or more digits
   * ) closes the capture group
   * \) matches ")" to capture the end of a mul() statement in the string
   */
  const part_one_regex = /mul\((\d+,\d+)\)/gi;

  /**
   * This regex is similar, except it also captures dos and donts as markers for which multiplications should be run.
   */
  const part_two_regex = /mul\((\d+,\d+)\)|(don't\(\))|(do\(\))/gi;

  const part_1_multiplication_sum = run_multiplications(
    // Using map() to get and array with just the pairs of digits that we captured in the first regex capture group.
    [...memory_data.matchAll(part_one_regex)].map((value) => {
      return value[1];
    })
  );

  const part_2_multiplication_sum = run_multiplications(
    get_valid_part_two_multiplications(
      // The regex for this one has more capture groups to inspect, but we want to make a flatter array to make using it easier down the line.
      [...memory_data.matchAll(part_two_regex)].map((value) => {
        // This is the capture group that contains don't().
        if (value[2]) {
          return value[2];
        }

        // This is the capture group that contains do().
        if (value[3]) {
          return value[3];
        }

        // Return the regular mul() value that we potentially need to run the multiplication on.
        return value[1];
      })
    )
  );

  console.log(`answer for part 1: ${part_1_multiplication_sum}`);
  console.log(`answer for part 2: ${part_2_multiplication_sum}`);
}

function get_valid_part_two_multiplications(multiplication_matches: string[]) {
  let valid = true;
  const valid_digits = [];

  for (let i = 0; i < multiplication_matches.length; i++) {
    if ("don't()" === multiplication_matches[i]) {
      valid = false;
      continue;
    }

    if ("do()" === multiplication_matches[i]) {
      valid = true;
      continue;
    }

    if (valid) {
      valid_digits.push(multiplication_matches[i]);
    }
  }

  return valid_digits;
}

function run_multiplications(multiplication_matches: string[]) {
  return multiplication_matches.reduce((sum, match) => {
    const digits = match.split(",");

    sum += parseInt(digits[0]) * parseInt(digits[1]);

    return sum;
  }, 0);
}

main();
