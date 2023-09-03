class Clock {
  constructor(t) {
    if (!t) throw "Missing parameters";
    (this.twelveHours = 12 === window.settings.clockHours),
      (this.parent = document.getElementById(t)),
      (this.parent.innerHTML += `<div id="mod_clock" class="${
        this.twelveHours ? "mod_clock_twelve" : ""
      }">\n            <h1 id="mod_clock_text"><span>?</span><span>?</span><span>:</span><span>?</span><span>?</span><span>:</span><span>?</span><span>?</span></h1>\n        </div>`),
      (this.lastTime = new Date()),
      this.updateClock(),
      (this.updater = setInterval(() => {
        this.updateClock();
      }, 1e3));
  }
  updateClock() {
    let t = new Date(),
      s = [t.getHours(), t.getMinutes(), t.getSeconds()];
    this.twelveHours &&
      ((this.ampm = s[0] >= 12 ? "PM" : "AM"),
      s[0] > 12 && (s[0] = s[0] - 12),
      0 === s[0] && (s[0] = 12)),
      s.forEach((t, e) => {
        2 !== t.toString().length && (s[e] = "0" + t);
      });
    let e = `${s[0]}:${s[1]}:${s[2]}`;
    (s = e.match(/.{1}/g)),
      (e = ""),
      s.forEach((t) => {
        e += ":" === t ? "<em>" + t + "</em>" : "<span>" + t + "</span>";
      }),
      this.twelveHours && (e += `<span>${this.ampm}</span>`),
      (document.getElementById("mod_clock_text").innerHTML = e),
      (this.lastTime = t);
  }
}
module.exports = { Clock };
