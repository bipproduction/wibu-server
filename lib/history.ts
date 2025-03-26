import fs from "fs/promises";
import path from "path";

const root = "/var/www/projects";

interface ParsedArgs {
  [key: string]: string | boolean | string[] | undefined;
  _: string[];
}

function parseArgs(argv: string[]): ParsedArgs {
  const args: ParsedArgs = { _: [] }; // Inisialisasi dengan "_" sebagai array kosong
  const input = argv.slice(2); // Skip "node" dan nama file script

  for (let i = 0; i < input.length; i++) {
    const arg = input[i];

    // Cek apakah argumen adalah opsi (dimulai dengan -- atau -)
    if (arg.startsWith("--") || arg.startsWith("-")) {
      const prefixLength = arg.startsWith("--") ? 2 : 1;
      const key = arg.slice(prefixLength); // Hapus prefix sesuai panjangnya
      let value: string | boolean = true; // Default adalah true (flag)

      // Cek apakah ada value setelahnya
      if (
        i + 1 < input.length &&
        !input[i + 1].startsWith("--") &&
        !input[i + 1].startsWith("-")
      ) {
        value = input[i + 1];
        i++; // Lewati argumen berikutnya karena sudah digunakan sebagai value
      }

      args[key] = value;
    } else {
      // Jika bukan opsi, tambahkan ke array "_"
      args["_"].push(arg);
    }
  }

  return args;
}

// Contoh penggunaan
const args = parseArgs(process.argv);
const appname = args.name;
const namespace = args.namespace;

if (!appname || !namespace) {
  console.error("--name dan --namespace harus diisi");
  process.exit(1);
}

const appDir = path.join(root, `${appname}/${namespace}`);
const releasesDir = path.join(appDir, "releases");
const currentDir = path.join(appDir, "current");

async function main() {
  try {
    // Pastikan direktori-direktori penting tersedia
    await fs.access(appDir);
    await fs.access(releasesDir);
    await fs.access(currentDir);
  } catch (error) {
    console.error("Failed to check directories:", error);
    process.exit(1);
  }

  try {
    // Baca symlink untuk rilis saat ini
    const current = await fs.readlink(currentDir);

    // Baca daftar rilis
    const releases = await fs.readdir(releasesDir);

    // Jika jumlah rilis lebih dari 5, hapus rilis tertua
    if (releases.length > 5) {
      const sortedReleases = releases.sort(); // Urutkan rilis berdasarkan nama
      const oldReleases = sortedReleases.splice(0, releases.length - 5); // Ambil rilis tertua

      for (const release of oldReleases) {
        // Jangan hapus rilis yang sedang digunakan
        if (current.includes(release)) {
          continue;
        }

        console.log(`Deleting old release: ${release}`);
        // Hapus rilis tertua
        await fs.rm(path.join(releasesDir, release), { recursive: true, force: true });
      }

      console.log("Old releases deleted");
    }
  } catch (error) {
    console.error("Error while managing releases:", error);
    process.exit(1);
  }

  console.log("Releases managed successfully");
  process.exit(0);
}

main().catch((error) => {
  console.error("Failed to manage releases:", error);
  process.exit(1);
});