#!/bin/sh

# For more comments about what's going on here, see the `hello_world` example

set -ex

cargo build --target wasm32-unknown-unknown
cargo run --manifest-path ../../crates/cli/Cargo.toml \
  --bin wasm-bindgen -- \
  ../../target/wasm32-unknown-unknown/debug/webaudio_wasm.wasm --out-dir . \
  --no-modules

# Concatenate all our files into one, ideally a bundler would probably do this.
cat my-processor-prefix.js webaudio_wasm.js my-processor-suffix.js > my-processor.js

http
