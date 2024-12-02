"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function main() {
    var data = formatData(readInput());
    var part_1_safe_reports = get_safe_reports(data, false);
    var part_2_safe_reports = get_safe_reports(data, true);
    console.log("answer for part 1: ".concat(part_1_safe_reports.length));
    console.log("answer for part 2: ".concat(part_2_safe_reports.length));
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
    return get_reports_from_data(data);
}
/**
 * Formats each report from the input file to ensure all the reported levels are integers.
 * @param data String of input.txt content.
 * @returns array
 */
function get_reports_from_data(data) {
    var reports = [];
    data.split(/\r?\n/).forEach(function (line) {
        var levels = [];
        line.split(/\s+/).forEach(function (char) {
            levels.push(parseInt(char));
        });
        reports.push(levels);
    });
    return reports;
}
function get_safe_reports(reports, dampener) {
    var safe_reports = reports.filter(function (report) {
        var safe_report = report_is_safe(report);
        if (dampener && !safe_report) {
            safe_report = can_report_be_made_safe(report);
        }
        return safe_report;
    });
    return safe_reports;
}
function report_is_safe(report) {
    if (!difference_is_safe(report[0], report[1])) {
        return false;
    }
    var direction = "increasing";
    var prev_level = report[1];
    if (report[0] > report[1]) {
        direction = "decreasing";
    }
    for (var i = 2; i < report.length; i++) {
        var level = report[i];
        var difference = level - prev_level;
        var safe_difference = difference_is_safe(prev_level, level);
        var safe_direction = direction_is_safe(direction, difference);
        if (safe_difference && safe_direction) {
            prev_level = level;
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}
function can_report_be_made_safe(report) {
    for (var i = 0; i < report.length; i++) {
        var dampened_report = __spreadArray([], report, true);
        dampened_report.splice(i, 1);
        var dampened_report_is_safe = report_is_safe(dampened_report);
        if (dampened_report_is_safe) {
            return true;
        }
    }
    return false;
}
function difference_is_safe(level1, level2) {
    var difference = level1 - level2;
    return Math.abs(difference) > 0 && Math.abs(difference) <= 3;
}
function direction_is_safe(direction, difference) {
    if ("increasing" === direction && difference < 0) {
        return false;
    }
    if ("decreasing" === direction && difference > 0) {
        return false;
    }
    return true;
}
main();
