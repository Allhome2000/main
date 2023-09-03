class AudioManager {
  constructor() {
    const s = require("path"),
      { Howl: e, Howler: a } = require("howler");
    return (
      !0 === window.settings.audio
        ? (!1 === window.settings.disableFeedbackAudio &&
            ((this.stdout = new e({
              src: [s.join(__dirname, "assets", "audio", "stdout.wav")],
              volume: 0.4,
            })),
            (this.stdin = new e({
              src: [s.join(__dirname, "assets", "audio", "stdin.wav")],
              volume: 0.4,
            })),
            (this.folder = new e({
              src: [s.join(__dirname, "assets", "audio", "folder.wav")],
            })),
            (this.granted = new e({
              src: [s.join(__dirname, "assets", "audio", "granted.wav")],
            }))),
          (this.keyboard = new e({
            src: [s.join(__dirname, "assets", "audio", "keyboard.wav")],
          })),
          (this.theme = new e({
            src: [s.join(__dirname, "assets", "audio", "theme.wav")],
          })),
          (this.expand = new e({
            src: [s.join(__dirname, "assets", "audio", "expand.wav")],
          })),
          (this.panels = new e({
            src: [s.join(__dirname, "assets", "audio", "panels.wav")],
          })),
          (this.scan = new e({
            src: [s.join(__dirname, "assets", "audio", "scan.wav")],
          })),
          (this.denied = new e({
            src: [s.join(__dirname, "assets", "audio", "denied.wav")],
          })),
          (this.info = new e({
            src: [s.join(__dirname, "assets", "audio", "info.wav")],
          })),
          (this.alarm = new e({
            src: [s.join(__dirname, "assets", "audio", "alarm.wav")],
          })),
          (this.error = new e({
            src: [s.join(__dirname, "assets", "audio", "error.wav")],
          })),
          a.volume(window.settings.audioVolume))
        : a.volume(0),
      new Proxy(this, { get: (s, e) => (e in s ? s[e] : { play: () => !0 }) })
    );
  }
}
module.exports = { AudioManager };
