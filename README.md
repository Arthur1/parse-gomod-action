# parse-gomod-action

This is an action for GitHub Actions that parses go.mod and go.work files of Go Programming language and outputs the result.

## Usage

```yaml
- uses: Arthur1/parse-gomod-action@v0
  with:
    # [Optional] Path to the go.mod/go.work (Default: ./go.mod)
    file: ./path/to/go.mod
```

### Outputs

#### go

go directive value of go.mod. For example, `go 1.21.0` in go.mod file would yield `1.21.0` as go output.

#### toolchain

toolchain directive value of go.mod. For example, `toolchain go1.23.0` in go.mod file would yield `go1.23.0` as go output.

#### toolchain-go-version

Go version declared in toolchain directive of go.mod. For example, `toolchain go1.23.0` in go.mod file would yield `1.23.0` as go output.

## Application

If you want to set the Go version in a CI environment to exactly what you declare in the toolchain directive, you can accomplish this as follows:

```yaml
- id: parse-gomod
  uses: Arthur1/parse-gomod-action@v0
- uses: actions/setup-go@v5
  with:
    go-version: ${{ steps.parse-gomod.outputs.toolchain-go-version }}
```
