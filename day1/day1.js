"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function main() {
    var data = formatData(readInput());
    var distance = get_distance_from_pairs(data);
    var similarity = get_similarity_from_pairs(data);
    console.log("answer for part 1: ".concat(distance));
    console.log("answer for part 2: ".concat(similarity));
}
function readInput() {
    var input = "".concat(__dirname, "/input.txt");
    return fs.readFileSync(input, { encoding: "utf8", flag: "r" });
}
/**
 * Format the data from the string that readFileSync returns into something we can use to solve today's puzzles.
 * @param data
 * @returns
 */
function formatData(data) {
    return create_pairs_array(split_lines_and_sort(data));
}
/**
 * Create two lists of ids, sort them, and return them as a combined array.
 * @param data String of input.txt content.
 * @returns array
 */
function split_lines_and_sort(data) {
    var left_side = [];
    var right_side = [];
    data.split(/\r?\n/).forEach(function (line) {
        var ids = line.split(/\s+/);
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
function create_pairs_array(data) {
    var id_pairs = data[0].map(function (left_side_number, index) {
        return [left_side_number, data[1][index]];
    });
    return id_pairs;
}
function count_occurrences(ids) {
    var counts = new Map();
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
        var id = ids_1[_i];
        counts.set(id[1], (counts.get(id[1]) || 0) + 1);
    }
    return counts;
}
/**
 * Calculate the sum of the distances of each id pair to get the answer for part 1.
 * @param pairs Nested array of id pair arrays.
 * @returns number
 */
function get_distance_from_pairs(pairs) {
    var distance = 0;
    pairs.forEach(function (id_pair) {
        distance += Math.abs(id_pair[0] - id_pair[1]);
    });
    return distance;
}
/**
 * Calculate the similarity score of the ids arrays to get the answer for part 2.
 * @param pairs
 * @returns number
 */
function get_similarity_from_pairs(pairs) {
    var similarity = 0;
    var counter = count_occurrences(pairs);
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var ids = pairs_1[_i];
        if (counter.get(ids[0])) {
            similarity += ids[0] * counter.get(ids[0]);
        }
    }
    return similarity;
}
main();
