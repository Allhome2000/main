class Conninfo {
  constructor(e) {
    if (!e) throw "Missing parameters";
    (this.parent = document.getElementById(e)),
      (this.parent.innerHTML +=
        '<div id="mod_conninfo">\n            <div id="mod_conninfo_innercontainer">\n                <h1>NETWORK TRAFFIC<i>UP / DOWN, MB/S</i></h1>\n                <h2>TOTAL<i>0B OUT, 0B IN</i></h2>\n                <canvas id="mod_conninfo_canvas_top"></canvas>\n                <canvas id="mod_conninfo_canvas_bottom"></canvas>\n                <h3>OFFLINE</h3>\n            </div>\n        </div>'),
      (this.current = document.querySelector(
        "#mod_conninfo_innercontainer > h1 > i"
      )),
      (this.total = document.querySelector(
        "#mod_conninfo_innercontainer > h2 > i"
      )),
      (this._pb = require("pretty-bytes"));
    let t = require("smoothie").TimeSeries,
      i = require("smoothie").SmoothieChart,
      n = [
        {
          limitFPS: 40,
          responsive: !0,
          millisPerPixel: 70,
          interpolation: "linear",
          grid: {
            millisPerLine: 5e3,
            fillStyle: "transparent",
            strokeStyle: `rgba(${window.theme.r},${window.theme.g},${window.theme.b},0.4)`,
            verticalSections: 3,
            borderVisible: !1,
          },
          labels: {
            fontSize: 10,
            fillStyle: `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
            precision: 2,
          },
        },
      ];
    n.push(Object.assign({}, n[0])),
      (n[0].minValue = 0),
      (n[1].maxValue = 0),
      (this.series = [new t(), new t()]),
      (this.charts = [new i(n[0]), new i(n[1])]),
      this.charts[0].addTimeSeries(this.series[0], {
        lineWidth: 1.7,
        strokeStyle: `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
      }),
      this.charts[1].addTimeSeries(this.series[1], {
        lineWidth: 1.7,
        strokeStyle: `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
      }),
      this.charts[0].streamTo(
        document.getElementById("mod_conninfo_canvas_top"),
        1e3
      ),
      this.charts[1].streamTo(
        document.getElementById("mod_conninfo_canvas_bottom"),
        1e3
      ),
      this.updateInfo(),
      (this.infoUpdater = setInterval(() => {
        this.updateInfo();
      }, 1e3));
  }
  updateInfo() {
    let e = new Date().getTime();
    if (window.mods.netstat.offline || null === window.mods.netstat.iface)
      return (
        this.series[0].append(e, 0),
        this.series[1].append(e, 0),
        void document
          .querySelector("div#mod_conninfo")
          .setAttribute("class", "offline")
      );
    document.querySelector("div#mod_conninfo").setAttribute("class", ""),
      window.si.networkStats(window.mods.netstat.iface).then((t) => {
        let i = this.series[0].maxValue,
          n = -this.series[1].minValue;
        i > n
          ? (this.series[1].minValue = -i)
          : n > i && (this.series[0].maxValue = n),
          this.series[0].append(e, t[0].tx_sec / 125e3),
          this.series[1].append(e, -t[0].rx_sec / 125e3),
          (this.total.innerText = `${this._pb(t[0].tx_bytes)} OUT, ${this._pb(
            t[0].rx_bytes
          )} IN`.toUpperCase()),
          (this.current.innerText =
            "UP " +
            parseFloat(t[0].tx_sec / 125e3).toFixed(2) +
            " DOWN " +
            parseFloat(t[0].rx_sec / 125e3).toFixed(2));
      });
  }
}
module.exports = { Conninfo };
