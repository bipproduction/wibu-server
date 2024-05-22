#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var gen_api_1 = require("./gen_api");
var gen_page_1 = require("./gen_page");
(0, yargs_1.default)()
    .command("api", "generate api", function (yargs) { return yargs
    .options("n", {
    alias: "name",
    description: "file name by default src/util/gen_api.ts",
    type: "string"
}); }, funGenApi)
    .command("page", "generate page", function (yargs) { return yargs
    .options("n", {
    alias: "name",
    description: "file name by default src/util/gen_page.ts",
    type: "string"
}); }, funGenPage)
    .demandCommand(1, "Please provide a command")
    .recommendCommands()
    .help()
    .version()
    .parse(process.argv.splice(2));
function funGenApi(argv) {
    var name = argv.n;
    (0, gen_api_1.genApi)({ name: name });
}
function funGenPage(argv) {
    var name = argv.n;
    (0, gen_page_1.genPage)(name);
}
