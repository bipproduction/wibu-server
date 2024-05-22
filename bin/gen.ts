#!/usr/bin/env node
import yargs from 'yargs';
import { genApi } from './gen_api';
import { genPage } from './gen_page';
import fs from 'fs';
const directoryPath = './src';

const app_config = `
import os from 'os'

const app_config = {
    title: 'Wibu Server',
    description: 'Server Untuk Wibu',
    host: os.platform() === "darwin" ? "http://localhost:3005" : "https://wibu-server.wibudev.com",
    isLocal: os.platform() === "darwin"
}

export default app_config
`;

; (async () => {
    if (!fs.existsSync(directoryPath)) {
        console.log('Please run in project root nextjs');
        return
    }

    if (!fs.existsSync("./src/util")) {
        // ? create dir util
        fs.mkdirSync("./src/util");
        console.log('create dir util');
    }

    // check if ./src/util/app_config.ts not exist
    if (!fs.existsSync("./src/util/app_config.ts")) {
        // ? create app_config.ts
        fs.writeFileSync("./src/util/app_config.ts", app_config, { encoding: 'utf8' });
        console.log('create app_config.ts');
    }


    yargs()
        .command(
            "api",
            "generate api",
            yargs => yargs
                .options("n", {
                    alias: "name",
                    description: "file name by default src/util/gen_api.ts",
                    type: "string"
                }),
            funGenApi
        )
        .command(
            "page",
            "generate page",
            yargs => yargs
                .options("n", {
                    alias: "name",
                    description: "file name by default src/util/gen_page.ts",
                    type: "string"
                }),
            funGenPage
        )
        .demandCommand(1, "Please provide a command")
        .recommendCommands()
        .help()
        .version()
        .parse(process.argv.splice(2))

    function funGenApi(argv: any) {
        const name = argv.n
        genApi({ name })
    }

    function funGenPage(argv: any) {
        const name = argv.n
        genPage(name)
    }
})()