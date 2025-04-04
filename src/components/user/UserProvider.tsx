"use client";
import userState from "@/state/user";
import utilState from "@/state/util";
import { useShallowEffect } from "@mantine/hooks";

export function UserProvider() {
  useShallowEffect(() => {
    userState.session.load();
    utilState.origin.load();
  }, []);
  return null;
}
