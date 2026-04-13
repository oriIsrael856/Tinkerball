class SoundManager {
  constructor() {
    this.context = null;
    this.ambientSource = null;
    this.ambientGain = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.isInitialized = true;
    
    // Resume context if suspended (browser policy)
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  createOscillator(freq, type = 'sine', duration = 0.2, volume = 0.1) {
    if (!this.isInitialized) this.init();
    
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.context.currentTime);
    
    gain.gain.setValueAtTime(volume, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + duration);
  }

  // Kick sound (thud)
  playKick() {
    if (!this.isInitialized) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.frequency.setValueAtTime(150, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + 0.1);
  }

  // Whistle (modulated high pitch)
  playWhistle() {
    if (!this.isInitialized) return;
    const duration = 0.3;
    const osc1 = this.context.createOscillator();
    const osc2 = this.context.createOscillator();
    const gain = this.context.createGain();

    osc1.frequency.setValueAtTime(2000, this.context.currentTime);
    osc2.frequency.setValueAtTime(2015, this.context.currentTime);

    gain.gain.setValueAtTime(0.05, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.context.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.context.currentTime + duration);
    osc2.stop(this.context.currentTime + duration);
  }

  // Success chime
  playSuccess() {
    if (!this.isInitialized) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 'sine', 0.4, 0.05);
      }, i * 100);
    });
  }

  // Fail (slide down)
  playFail() {
    if (!this.isInitialized) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.frequency.setValueAtTime(300, this.context.currentTime);
    osc.frequency.linearRampToValueAtTime(100, this.context.currentTime + 0.5);

    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + 0.5);
  }

  playTick() {
    this.createOscillator(4000, 'sine', 0.02, 0.02);
  }

  startAmbience() {
    if (!this.isInitialized) return;
    if (this.ambientSource) return;

    // We'll use white noise filtered to sound like a distant crowd if we can't get a file
    // But for now, let's just create a very soft brown noise
    const bufferSize = 2 * this.context.sampleRate;
    const noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // brown noise is quiet
    }

    this.ambientSource = this.context.createBufferSource();
    this.ambientSource.buffer = noiseBuffer;
    this.ambientSource.loop = true;

    this.ambientGain = this.context.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, this.context.currentTime);

    this.ambientSource.connect(this.ambientGain);
    this.ambientGain.connect(this.context.destination);

    this.ambientSource.start();
  }

  stopAmbience() {
    if (this.ambientSource) {
      this.ambientSource.stop();
      this.ambientSource = null;
    }
  }
}

export const soundManager = new SoundManager();
