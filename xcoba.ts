#!/usr/bin/env bun
import { $ } from "bun";
const apa = await $`echo apa`.text()
console.log(apa)