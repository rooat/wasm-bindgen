// Unlike web workers it looks like audio worklets don't have a global `self`
// object defined. The `wasm_bingen` bindings, however, will try to attach
// themselves to the global object via `self`, so define it here as a bit of a
// hack.
const self = {};
