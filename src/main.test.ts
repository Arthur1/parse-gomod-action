import { parseGoMod } from "./main";

describe("parseGoMod", () => {
  it("read go directive from go.mod file", async () => {
    const body = `
module github.com/Arthur1/gomod-parse-action-test

go 1.21.0
`;
    const result = await parseGoMod(body);
    expect(result.go).toBe("1.21.0");
    expect(result.toolchain).toBe(undefined);
    expect(result.toolchainGoVersion).toBe(undefined);
  });

  it("set go undefined if there is no go directives", async () => {
    const body = `module github.com/Arthur1/gomod-parse-action-test`;
    const result = await parseGoMod(body);
    expect(result.go).toBe(undefined);
    expect(result.toolchain).toBe(undefined);
    expect(result.toolchainGoVersion).toBe(undefined);
  });

  it("read toolchain directive from go.mod file", async () => {
    const body = `
module github.com/Arthur1/gomod-parse-action-test

go 1.21.0

toolchain hoge
`;
    const result = await parseGoMod(body);
    expect(result.go).toBe("1.21.0");
    expect(result.toolchain).toBe("hoge");
    expect(result.toolchainGoVersion).toBe(undefined);
  });

  it("set toolchainGoVersion properly if toolchain value has go prefix", async () => {
    const body = `
module github.com/Arthur1/gomod-parse-action-test

go 1.21.0

toolchain go1.22.5
`;
    const result = await parseGoMod(body);
    expect(result.go).toBe("1.21.0");
    expect(result.toolchain).toBe("go1.22.5");
    expect(result.toolchainGoVersion).toBe("1.22.5");
  });
});
