#!/usr/bin/env node
const yargs = require('yargs')
const { execSync } = require('child_process')
require('colors')

yargs
    .command(
        "cmd",
        "cmd",
        yargs => yargs
            .options("cmd", {
                alias: "c"
            }),
        version
    )
    .demandCommand(1)
    .recommendCommands()
    .parse(process.argv.splice(2))

async function version(argv) {
    // console.log(argv.p, "hahahahahha")
    if (argv.c) {
        try {
            const ls = execSync("yarn build")
            console.log(ls.toString())
        } catch (error) {
            console.log("=== ERROR ===")
        }
    }

}