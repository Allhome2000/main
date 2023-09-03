class Cpuinfo {
  constructor(e) {
    if (!e) throw "Missing parameters";
    (this.parent = document.getElementById(e)),
      (this.parent.innerHTML += '<div id="mod_cpuinfo">\n        </div>'),
      (this.container = document.getElementById("mod_cpuinfo"));
    let t = require("smoothie").TimeSeries,
      i = require("smoothie").SmoothieChart;
    (this.series = []),
      (this.charts = []),
      window.si.cpu().then((e) => {
        let n = Math.floor(e.cores / 2);
        this.divide = n;
        let s = e.manufacturer + e.brand;
        (s = s.substr(0, 30)),
          s.substr(0, Math.min(s.length, s.lastIndexOf(" ")));
        let d = document.createElement("div");
        d.setAttribute("id", "mod_cpuinfo_innercontainer"),
          (d.innerHTML = `<h1>CPU USAGE<i>${s}</i></h1>\n                <div>\n                    <h1># <em>1</em> - <em>${n}</em><br>\n                    <i id="mod_cpuinfo_usagecounter0">Avg. --%</i></h1>\n                    <canvas id="mod_cpuinfo_canvas_0" height="60"></canvas>\n                </div>\n                <div>\n                    <h1># <em>${
            n + 1
          }</em> - <em>${
            e.cores
          }</em><br>\n                    <i id="mod_cpuinfo_usagecounter1">Avg. --%</i></h1>\n                    <canvas id="mod_cpuinfo_canvas_1" height="60"></canvas>\n                </div>\n                <div>\n                    <div>\n                        <h1>${
            "win32" === process.platform ? "CORES" : "TEMP"
          }<br>\n                        <i id="mod_cpuinfo_temp">${
            "win32" === process.platform ? e.cores : "--°C"
          }</i></h1>\n                    </div>\n                    <div>\n                        <h1>SPD<br>\n                        <i id="mod_cpuinfo_speed_min">--GHz</i></h1>\n                    </div>\n                    <div>\n                        <h1>MAX<br>\n                        <i id="mod_cpuinfo_speed_max">--GHz</i></h1>\n                    </div>\n                    <div>\n                        <h1>TASKS<br>\n                        <i id="mod_cpuinfo_tasks">---</i></h1>\n                    </div>\n                </div>`),
          this.container.append(d);
        for (var a = 0; a < 2; a++)
          this.charts.push(
            new i({
              limitFPS: 30,
              responsive: !0,
              millisPerPixel: 50,
              grid: {
                fillStyle: "transparent",
                strokeStyle: "transparent",
                verticalSections: 0,
                borderVisible: !1,
              },
              labels: { disabled: !0 },
              yRangeFunction: () => ({ min: 0, max: 100 }),
            })
          );
        for (var a = 0; a < e.cores; a++) {
          this.series.push(new t());
          let e = this.series[a],
            i = {
              lineWidth: 1.7,
              strokeStyle: `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
            };
          a < n
            ? this.charts[0].addTimeSeries(e, i)
            : this.charts[1].addTimeSeries(e, i);
        }
        for (var a = 0; a < 2; a++)
          this.charts[a].streamTo(
            document.getElementById(`mod_cpuinfo_canvas_${a}`),
            500
          );
        (this.updatingCPUload = !1),
          this.updateCPUload(),
          "win32" !== process.platform && this.updateCPUtemp(),
          (this.updatingCPUspeed = !1),
          this.updateCPUspeed(),
          (this.updatingCPUtasks = !1),
          this.updateCPUtasks(),
          (this.loadUpdater = setInterval(() => {
            this.updateCPUload();
          }, 500)),
          "win32" !== process.platform &&
            (this.tempUpdater = setInterval(() => {
              this.updateCPUtemp();
            }, 2e3)),
          (this.speedUpdater = setInterval(() => {
            this.updateCPUspeed();
          }, 1e3)),
          (this.tasksUpdater = setInterval(() => {
            this.updateCPUtasks();
          }, 5e3));
      });
  }
  updateCPUload() {
    this.updatingCPUload ||
      ((this.updatingCPUload = !0),
      window.si.currentLoad().then((e) => {
        let t = [[], []];
        e.cpus &&
          (e.cpus.forEach((e, i) => {
            this.series[i].append(new Date().getTime(), e.load),
              i < this.divide ? t[0].push(e.load) : t[1].push(e.load);
          }),
          t.forEach((e, i) => {
            t[i] = Math.round(e.reduce((e, t) => e + t, 0) / e.length);
            try {
              document.getElementById(
                `mod_cpuinfo_usagecounter${i}`
              ).innerText = `Avg. ${t[i]}%`;
            } catch (e) {}
          }),
          (this.updatingCPUload = !1));
      }));
  }
  updateCPUtemp() {
    window.si.cpuTemperature().then((e) => {
      try {
        document.getElementById("mod_cpuinfo_temp").innerText = `${e.max}°C`;
      } catch (e) {}
    });
  }
  updateCPUspeed() {
    this.updatingCPUspeed ||
      ((this.updatingCPUspeed = !0),
      window.si.cpu().then((e) => {
        try {
          (document.getElementById(
            "mod_cpuinfo_speed_min"
          ).innerText = `${e.speed}GHz`),
            (document.getElementById(
              "mod_cpuinfo_speed_max"
            ).innerText = `${e.speedMax}GHz`);
        } catch (e) {}
        this.updatingCPUspeed = !1;
      }));
  }
  updateCPUtasks() {
    this.updatingCPUtasks ||
      ((this.updatingCPUtasks = !0),
      window.si.processes().then((e) => {
        try {
          document.getElementById("mod_cpuinfo_tasks").innerText = `${e.all}`;
        } catch (e) {}
        this.updatingCPUtasks = !1;
      }));
  }
}
module.exports = { Cpuinfo };
