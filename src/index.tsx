import * as core from "@actions/core";

run();

async function run(): Promise<void> {
  try {
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
}
