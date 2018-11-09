const context = new AudioContext();

async function run(wasmModule) {

  await context.audioWorklet.addModule('my-processor.js');

  // let wasm = rust_module.Oscillator.new();
  // console.log("called Oscillator.new()")
  // console.log(wasm);

  let oscillator = new AudioWorkletNode(context, 'oscillator', {
    processorOptions: {
      sampleRate: context.sampleRate,
      wasm: wasmModule,
    }
  });

  oscillator.connect(context.destination);
  context.suspend();
}

let playing = false;
const play = document.getElementById('play');
play.addEventListener('click', function() {
  if (playing) {
    context.suspend();
  } else {
    context.resume();
  }
  playing = !playing;
});

WebAssembly.compileStreaming(fetch('./webaudio_wasm_bg.wasm'))
    .then(run);
