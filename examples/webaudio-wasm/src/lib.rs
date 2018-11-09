extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Oscillator {
    phase: f32,
    phase_inc: f32,
}

#[wasm_bindgen]
impl Oscillator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            phase: 0.0,
            phase_inc: 110.0 / 44100.0,
        }
    }

    pub fn set_frequency(&mut self, frequency: f32, sample_rate: f32) {
        self.phase_inc = frequency / sample_rate;
    }

    pub fn tick(&mut self) -> f32 {
        let result = self.phase.sin();
        self.phase += self.phase_inc;
        if self.phase > 1.0 {
            self.phase -= 1.0;
        }
        result
    }
}
