import * as fs from "fs";

function main() {
  const data = formatData(readInput());

  const part_1_safe_reports = get_safe_reports(data, false);
  const part_2_safe_reports = get_safe_reports(data, true);

  console.log(`answer for part 1: ${part_1_safe_reports.length}`);
  console.log(`answer for part 2: ${part_2_safe_reports.length}`);
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
  return get_reports_from_data(data);
}

/**
 * Formats each report from the input file to ensure all the reported levels are integers.
 * @param data String of input.txt content.
 * @returns array
 */
function get_reports_from_data(data: string) {
  const reports: number[][] = [];

  data.split(/\r?\n/).forEach(function (line) {
    const levels: number[] = [];

    line.split(/\s+/).forEach(function (char) {
      levels.push(parseInt(char));
    });

    reports.push(levels);
  });

  return reports;
}

function get_safe_reports(reports: number[][], dampener: boolean) {
  const safe_reports = reports.filter(function (report) {
    let safe_report = report_is_safe(report);

    if (dampener && !safe_report) {
      safe_report = can_report_be_made_safe(report);
    }

    return safe_report;
  });

  return safe_reports;
}

function report_is_safe(report: number[]) {
  if (!difference_is_safe(report[0], report[1])) {
    return false;
  }

  let direction = "increasing";
  let prev_level = report[1];

  if (report[0] > report[1]) {
    direction = "decreasing";
  }

  for (let i = 2; i < report.length; i++) {
    const level = report[i];
    const difference = level - prev_level;
    const safe_difference = difference_is_safe(prev_level, level);
    const safe_direction = direction_is_safe(direction, difference);

    if (safe_difference && safe_direction) {
      prev_level = level;
      continue;
    } else {
      return false;
    }
  }

  return true;
}

function can_report_be_made_safe(report: number[]) {
  for (let i = 0; i < report.length; i++) {
    const dampened_report = [...report];
    dampened_report.splice(i, 1);
    const dampened_report_is_safe = report_is_safe(dampened_report);

    if (dampened_report_is_safe) {
      return true;
    }
  }

  return false;
}

function difference_is_safe(level1: number, level2: number) {
  const difference = level1 - level2;

  return Math.abs(difference) > 0 && Math.abs(difference) <= 3;
}

function direction_is_safe(direction: string, difference: number) {
  if ("increasing" === direction && difference < 0) {
    return false;
  }

  if ("decreasing" === direction && difference > 0) {
    return false;
  }

  return true;
}

main();
