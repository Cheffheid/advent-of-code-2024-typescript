import * as fs from "fs";

export default function readInput(directory: string) {
  const input = `${directory}/input.txt`;
  return fs.readFileSync(input, { encoding: "utf8", flag: "r" });
}
