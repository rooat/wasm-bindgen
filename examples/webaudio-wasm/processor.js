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

    console.log("OscillatorProcessor constructor");
    console.log(options);

    this.sampleRate = options.processorOptions.sampleRate;
    // At this point, the wasm Oscillator object has lost its methods
    this.wasm = options.processorOptions.wasm;
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
