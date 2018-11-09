class OscillatorProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [ {
      name : 'frequency',
      defaultValue : 110,
      minValue : 20,
      maxValue : 2000,
      automationRate : "k-rate"
    } ];
  }

  constructor(options) {
    super();

    this.sampleRate = options.processorOptions.sampleRate;

    // Initialize the wasm bindings with our compiled module, and since this
    // isn't fetching anything they're immediately ready for use afterwards (no
    // need to use the returned promise)
    self.wasm_bindgen(options.processorOptions.wasm);

    // Create our wasm object!
    this.wasm = new self.wasm_bindgen.Oscillator();
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const frequency = parameters.frequency;

    // Here we get an error: "this.wasm.set_frequency is not a function"
    this.wasm.set_frequency(frequency[0], this.sampleRate);

    // Ideally we'd pass the whole buffer into a wasm function, but this will do for now
    for (let i = 0; i < output[0].length; i++) {
      let next = this.wasm.tick();
      for (let channel = 0; channel < output.length; ++channel) {
        output[channel][i] = next;
      }
    }

    return true;
  }
}

registerProcessor('oscillator', OscillatorProcessor);
