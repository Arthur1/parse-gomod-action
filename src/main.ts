import * as core from "@actions/core";
import { readFile } from "fs/promises";

run();

export async function run(): Promise<void> {
  try {
    const filePath = core.getInput("file");
    const fileBody = await readFile(filePath, { encoding: "utf-8" });
    const result = await parseGoMod(fileBody);
    core.setOutput("go", result.go ?? "");
    core.setOutput("toolchain", result.toolchain ?? "");
    core.setOutput("toolchain-go-version", result.toolchainGoVersion ?? "");
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
}

type GoMod = Readonly<{
  go: string | undefined;
  toolchain: string | undefined;
  toolchainGoVersion: string | undefined;
}>;

export async function parseGoMod(body: string): Promise<GoMod> {
  const go = body.match(/^go (\d+(\.\d+)*)/m)?.at(1);
  const toolchain = body.match(/^toolchain (.+)/m)?.at(1);
  const toolchainGoVersion = toolchain?.startsWith("go")
    ? toolchain.substring(2)
    : undefined;

  return {
    go,
    toolchain,
    toolchainGoVersion,
  };
}
