class Sysinfo {
  constructor(e) {
    if (!e) throw "Missing parameters";
    let t;
    switch (require("os").platform()) {
      case "darwin":
        t = "macOS";
        break;
      case "win32":
        t = "win";
        break;
      default:
        t = require("os").platform();
    }
    (this.parent = document.getElementById(e)),
      (this.parent.innerHTML += `<div id="mod_sysinfo">\n            <div>\n                <h1>1970</h1>\n                <h2>JAN 1</h2>\n            </div>\n            <div>\n                <h1>UPTIME</h1>\n                <h2>0:0:0</h2>\n            </div>\n            <div>\n                <h1>TYPE</h1>\n                <h2>${t}</h2>\n            </div>\n            <div>\n                <h1>POWER</h1>\n                <h2>00%</h2>\n            </div>\n        </div>`),
      this.updateDate(),
      this.updateUptime(),
      (this.uptimeUpdater = setInterval(() => {
        this.updateUptime();
      }, 6e4)),
      this.updateBattery(),
      (this.batteryUpdater = setInterval(() => {
        this.updateBattery();
      }, 3e3));
  }
  updateDate() {
    let e = new Date();
    document.querySelector("#mod_sysinfo > div:first-child > h1").innerHTML =
      e.getFullYear();
    let t = e.getMonth();
    switch (t) {
      case 0:
        t = "JAN";
        break;
      case 1:
        t = "FEB";
        break;
      case 2:
        t = "MAR";
        break;
      case 3:
        t = "APR";
        break;
      case 4:
        t = "MAY";
        break;
      case 5:
        t = "JUN";
        break;
      case 6:
        t = "JUL";
        break;
      case 7:
        t = "AUG";
        break;
      case 8:
        t = "SEP";
        break;
      case 9:
        t = "OCT";
        break;
      case 10:
        t = "NOV";
        break;
      case 11:
        t = "DEC";
        break;
    }
    document.querySelector("#mod_sysinfo > div:first-child > h2").innerHTML =
      t + " " + e.getDate();
    let a = 36e5 * (23 - e.getHours()) + 6e4 * (59 - e.getMinutes());
    setTimeout(() => {
      this.updateDate();
    }, a);
  }
  updateUptime() {
    let e = {
      raw: Math.floor(require("os").uptime()),
      days: 0,
      hours: 0,
      minutes: 0,
    };
    (e.days = Math.floor(e.raw / 86400)),
      (e.raw -= 86400 * e.days),
      (e.hours = Math.floor(e.raw / 3600)),
      (e.raw -= 3600 * e.hours),
      (e.minutes = Math.floor(e.raw / 60)),
      2 !== e.hours.toString().length && (e.hours = "0" + e.hours),
      2 !== e.minutes.toString().length && (e.minutes = "0" + e.minutes),
      (document.querySelector(
        "#mod_sysinfo > div:nth-child(2) > h2"
      ).innerHTML =
        e.days +
        '<span style="opacity:0.5;">d</span>' +
        e.hours +
        '<span style="opacity:0.5;">:</span>' +
        e.minutes);
  }
  updateBattery() {
    window.si.battery().then((e) => {
      let t = document.querySelector("#mod_sysinfo > div:last-child > h2");
      e.hasBattery
        ? e.isCharging
          ? (t.innerHTML = "CHARGE")
          : e.acConnected
          ? (t.innerHTML = "WIRED")
          : (t.innerHTML = e.percent + "%")
        : (t.innerHTML = "ON");
    });
  }
}
module.exports = { Sysinfo };
