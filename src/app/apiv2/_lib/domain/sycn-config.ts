/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { nginxStringToJson } from "../utils/nginx-config";
import fs from "fs/promises";
const pathConfigWibudev = "/etc/nginx/conf.d/wibudev.conf";
const pathConfigMuku = "/etc/nginx/conf.d/muku.conf";

export default async function syncConfig() {
  const wibudevText = await fs.readFile(pathConfigWibudev, "utf-8");
  const wibudevJson = nginxStringToJson(wibudevText);
  const mukuText = await fs.readFile(pathConfigMuku, "utf-8");
  const mukuJson = nginxStringToJson(mukuText);

  // upsert muku
  const trx = await prisma.$transaction(async (trx) => {
    const muku = await trx.domain.upsert({
      where: {
        domain_name: "muku",
      },
      create: {
        domain_name: "muku",
        sub_domains: mukuJson.sub_domains as any,
      },
      update: {
        sub_domains: mukuJson.sub_domains as any,
      },
    });

    // upsert wibuDev
    const wibuDev = await trx.domain.upsert({
      where: {
        domain_name: "wibuDev",
      },
      create: {
        domain_name: "wibuDev",
        sub_domains: wibudevJson.sub_domains as any,
      },
      update: {
        sub_domains: wibudevJson.sub_domains as any,
      },
    });
    return { muku, wibuDev };
  });

  return {
    success: true,
    data: {
      muku: trx.muku,
      wibuDev: trx.wibuDev,
    },
  };
}
