

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('freqA').addEventListener('input', (e) => {
        oscillatorA.frequency.value = e.target.value;
      });
      
      document.getElementById('freqB').addEventListener('input', (e) => {
        oscillatorB.frequency.value = e.target.value;
      });
      
      document.getElementById('depthB').addEventListener('input', (e) => {
        gainB.gain.value = e.target.value;
      });
      
      document.getElementById('feedbackGain').addEventListener('input', (e) => {
        gainFeedback.gain.value = e.target.value;
      });
      document.getElementById('masterFader').addEventListener('input', (e) => {
        gainMaster.gain.value = e.target.value;
      });
  const audioCtx = new AudioContext();

  // Oscillator A (main sound)
  const oscillatorA = audioCtx.createOscillator();
  oscillatorA.type = 'sawtooth'; 
  oscillatorA.frequency.value = 440; 

  // Delay node for flanging
  const delay = audioCtx.createDelay();
  delay.delayTime.value = 0.005; // initial center delay time (5ms)

  // Feedback loop
  const gainFeedback = audioCtx.createGain();
  gainFeedback.gain.value = 0.5; // 50% feedback

  // Oscillator B (LFO for modulating delay)
  const oscillatorB = audioCtx.createOscillator();
  oscillatorB.type = 'sine';
  oscillatorB.frequency.value = 0.25; // real slow

  const gainB = audioCtx.createGain();
  gainB.gain.value = 0.02; // tiny amount of modulation

  // Constant center delay source
  const constantDelay = audioCtx.createConstantSource();
  constantDelay.offset.value = 0.005; // center delay value (5ms)

  const gainMaster = audioCtx.createGain();
  gainMaster.gain.value = 0.5; // master volume

  // Routing the whole crew
  oscillatorA.connect(gainMaster);
  oscillatorA.connect(delay);
  delay.connect(gainMaster);

  gainMaster.connect(audioCtx.destination);

  // Feedback loop
  delay.connect(gainFeedback);
  gainFeedback.connect(delay);

  // Modulating delay time
  oscillatorB.connect(gainB);
  gainB.connect(delay.delayTime);

  // Adding the constant center delay
  constantDelay.connect(delay.delayTime);

  // Start the whole operation
  audioCtx.resume();
  oscillatorA.start();
  oscillatorB.start();
  constantDelay.start();
});


