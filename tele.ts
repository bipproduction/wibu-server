/* eslint-disable @typescript-eslint/no-unused-vars */
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import readline from "readline";

const SESSION_TEXT = process.env.TELE_SESSION_TEXT;
const TELE_APP_ID = Number(process.env.TELE_APP_ID);
const TELE_APP_HASH = process.env.TELE_APP_HASH;

if (!SESSION_TEXT || !TELE_APP_ID || !TELE_APP_HASH) {
  console.error(
    "TELE_SESSION_TEXT, TELE_APP_ID, or TELE_APP_HASH is not defined"
  );
  process.exit(1);
}

const stringSession = new StringSession(SESSION_TEXT);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, TELE_APP_ID, TELE_APP_HASH, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your number: ", resolve)
      ),
    password: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your password: ", resolve)
      ),
    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question("Please enter the code you received: ", resolve)
      ),
    onError: (err) => console.log(err),
  });
  console.log("You should now bCe connected.");
  const session = client.session.save() as unknown as string;
  //   console.log(session);

  // Opsional: Mengirim ke diri sendiri sebagai konfirmasi
  await client.sendMessage("-1002622442948", { message: "Hello! dari bot" });
})();

async function findGroupId(client: TelegramClient) {
  //   Tambahkan ini setelah client terhubung
  const dialogs = await client.getDialogs();
  for (const dialog of dialogs) {
    if (dialog.isGroup) {
      console.log(`Group Name: ${dialog.title}, ID: ${dialog.id}`);
    }
  }
}
