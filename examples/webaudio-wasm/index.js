const context = new AudioContext();

context.audioWorklet.addModule('processor.js').then(() => {
  import('./webaudio_wasm').then(rust_module => {
    let wasm = rust_module.Oscillator.new();
    console.log("called Oscillator.new()")
    console.log(wasm);

    let oscillator = new AudioWorkletNode(context, 'oscillator', {
      processorOptions: {
        sampleRate: context.sampleRate,
        wasm: wasm,
      }
    });

    oscillator.connect(context.destination);
  });
});
