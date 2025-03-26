#!/usr/bin/env bun

// Tipe untuk hasil parsing
interface ParsedArgs {
  _: string[]; // Argumen non-opsi
  [key: string]: string | boolean | string[]; // Opsi lainnya bisa string, boolean, atau array untuk _
}

// Tipe untuk aliases
type Aliases = Record<string, string>;

function parseArgs(args: string[], aliases: Aliases = {}): ParsedArgs {
  const result: ParsedArgs = {
    _: [],
  };

  const argList: string[] = Array.isArray(args) ? args.slice(2) : [];

  for (let i = 0; i < argList.length; i++) {
    const arg: string = argList[i];

    if (arg.startsWith("-")) {
      const cleanArg: string = arg.replace(/^-+/, "");
      let key: string = cleanArg;

      // Cek alias
      for (const [short, long] of Object.entries(aliases)) {
        if (cleanArg === short) {
          key = long;
          break;
        }
      }

      if (key.includes("=")) {
        const [k, value] = key.split("=", 2) as [string, string];
        result[k] = value;
      } else if (i + 1 < argList.length && !argList[i + 1].startsWith("-")) {
        result[key] = argList[i + 1];
        i++;
      } else {
        result[key] = true;
      }
    } else {
      result._.push(arg);
    }
  }

  return result;
}

const argv = parseArgs(process.argv);

console.log("3000".split(",").map(Number));