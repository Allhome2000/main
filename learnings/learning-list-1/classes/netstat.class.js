class Netstat {
  constructor(e) {
    if (!e) throw "Missing parameters";
    (this.parent = document.getElementById(e)),
      (this.parent.innerHTML +=
        '<div id="mod_netstat">\n            <div id="mod_netstat_inner">\n                <h1>NETWORK STATUS<i id="mod_netstat_iname"></i></h1>\n                <div id="mod_netstat_innercontainer">\n                    <div>\n                        <h1>STATE</h1>\n                        <h2>UNKNOWN</h2>\n                    </div>\n                    <div>\n                        <h1>IPv4</h1>\n                        <h2>--.--.--.--</h2>\n                    </div>\n                    <div>\n                        <h1>PING</h1>\n                        <h2>--ms</h2>\n                    </div>\n                </div>\n            </div>\n        </div>'),
      (this.offline = !1),
      (this.lastconn = { finished: !1 }),
      (this.iface = null),
      (this.failedAttempts = {}),
      (this.runsBeforeGeoIPUpdate = 0),
      (this._httpsAgent = new require("https").Agent({
        keepAlive: !1,
        maxSockets: 10,
      })),
      this.updateInfo(),
      (this.infoUpdater = setInterval(() => {
        this.updateInfo();
      }, 2e3)),
      (this.geoLookup = { get: () => null });
    let t = require("geolite2-redist"),
      n = require("maxmind");
    t.downloadDbs(
      require("path").join(
        require("@electron/remote").app.getPath("userData"),
        "geoIPcache"
      )
    ).then(() => {
      t.open("GeoLite2-City", (e) => n.open(e))
        .catch((e) => {
          throw e;
        })
        .then((e) => {
          (this.geoLookup = e), (this.lastconn.finished = !0);
        });
    });
  }
  updateInfo() {
    window.si.networkInterfaces().then(async (e) => {
      let t = !1,
        n = e[0],
        i = 0;
      if ("string" == typeof window.settings.iface)
        for (; n.iface !== window.settings.iface; ) {
          if ((i++, !e[i])) return (window.settings.iface = !1), !1;
          n = e[i];
        }
      else
        for (
          ;
          "up" !== n.operstate ||
          !0 === n.internal ||
          "" === n.ip4 ||
          "" === n.mac;

        ) {
          if ((i++, !e[i])) {
            (this.iface = null),
              (document.getElementById("mod_netstat_iname").innerText =
                "Interface: (offline)"),
              (this.offline = !0),
              (document.querySelector(
                "#mod_netstat_innercontainer > div:first-child > h2"
              ).innerHTML = "OFFLINE"),
              (document.querySelector(
                "#mod_netstat_innercontainer > div:nth-child(2) > h2"
              ).innerHTML = "--.--.--.--"),
              (document.querySelector(
                "#mod_netstat_innercontainer > div:nth-child(3) > h2"
              ).innerHTML = "--ms");
            break;
          }
          n = e[i];
        }
      if (
        (n.ip4 !== this.internalIPv4 && (this.runsBeforeGeoIPUpdate = 0),
        (this.iface = n.iface),
        (this.internalIPv4 = n.ip4),
        (document.getElementById("mod_netstat_iname").innerText =
          "Interface: " + n.iface),
        "127.0.0.1" === n.ip4)
      )
        t = !0;
      else {
        0 === this.runsBeforeGeoIPUpdate && this.lastconn.finished
          ? (this.lastconn = require("https")
              .get(
                {
                  host: "myexternalip.com",
                  port: 443,
                  path: "/json",
                  localAddress: n.ip4,
                  agent: this._httpsAgent,
                },
                (e) => {
                  let t = "";
                  e.on("data", (e) => {
                    t += e;
                  }),
                    e.on("end", () => {
                      try {
                        let e = JSON.parse(t);
                        this.ipinfo = {
                          ip: e.ip,
                          geo: this.geoLookup.get(e.ip).location,
                        };
                        let n = this.ipinfo.ip;
                        (document.querySelector(
                          "#mod_netstat_innercontainer > div:nth-child(2) > h2"
                        ).innerHTML = window._escapeHtml(n)),
                          (this.runsBeforeGeoIPUpdate = 10);
                      } catch (e) {
                        if (
                          ((this.failedAttempts[e] =
                            (this.failedAttempts[e] || 0) + 1),
                          this.failedAttempts[e] > 2)
                        )
                          return !1;
                        console.warn(e), console.info(t.toString());
                        let n = require("electron");
                        n.ipcRenderer.send(
                          "log",
                          "note",
                          "NetStat: Error parsing data from myexternalip.com"
                        ),
                          n.ipcRenderer.send("log", "debug", `Error: ${e}`);
                      }
                    });
                }
              )
              .on("error", (e) => {}))
          : 0 !== this.runsBeforeGeoIPUpdate &&
            (this.runsBeforeGeoIPUpdate = this.runsBeforeGeoIPUpdate - 1);
        let e = await this.ping(
          window.settings.pingAddr || "1.1.1.1",
          80,
          n.ip4
        ).catch(() => {
          t = !0;
        });
        (this.offline = t),
          t
            ? ((document.querySelector(
                "#mod_netstat_innercontainer > div:first-child > h2"
              ).innerHTML = "OFFLINE"),
              (document.querySelector(
                "#mod_netstat_innercontainer > div:nth-child(2) > h2"
              ).innerHTML = "--.--.--.--"),
              (document.querySelector(
                "#mod_netstat_innercontainer > div:nth-child(3) > h2"
              ).innerHTML = "--ms"))
            : ((document.querySelector(
                "#mod_netstat_innercontainer > div:first-child > h2"
              ).innerHTML = "ONLINE"),
              (document.querySelector(
                "#mod_netstat_innercontainer > div:nth-child(3) > h2"
              ).innerHTML = Math.round(e) + "ms"));
      }
    });
  }
  ping(e, t, n) {
    return new Promise((i, r) => {
      let o = new require("net").Socket(),
        s = process.hrtime();
      o.connect({ port: t, host: e, localAddress: n, family: 4 }, () => {
        let e = process.hrtime(s),
          t = (1e9 * e[0] + e[1]) / 1e6;
        i(t), o.destroy();
      }),
        o.on("error", (e) => {
          o.destroy(), r(e);
        }),
        o.setTimeout(1900, function () {
          o.destroy(), r(new Error("Socket timeout"));
        });
    });
  }
}
module.exports = { Netstat };
