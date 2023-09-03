class LocationGlobe {
  constructor(e) {
    if (!e) throw "Missing parameters";
    const o = require("path");
    (this._geodata = require(o.join(__dirname, "assets/misc/grid.json"))),
      require(o.join(__dirname, "assets/vendor/encom-globe.js")),
      (this.ENCOM = window.ENCOM),
      (this.parent = document.getElementById(e)),
      (this.parent.innerHTML +=
        '<div id="mod_globe">\n            <div id="mod_globe_innercontainer">\n                <h1>WORLD VIEW<i>GLOBAL NETWORK MAP</i></h1>\n                <h2>ENDPOINT LAT/LON<i class="mod_globe_headerInfo">0.0000, 0.0000</i></h2>\n                <div id="mod_globe_canvas_placeholder"></div>\n                <h3>OFFLINE</h3>\n            </div>\n        </div>'),
      (this.lastgeo = {}),
      (this.conns = []),
      setTimeout(() => {
        let e = document.getElementById("mod_globe_innercontainer"),
          o = document.getElementById("mod_globe_canvas_placeholder");
        (this.globe = new this.ENCOM.Globe(o.offsetWidth, o.offsetHeight, {
          font: window.theme.cssvars.font_main,
          data: [],
          tiles: this._geodata.tiles,
          baseColor:
            window.theme.globe.base ||
            `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
          markerColor:
            window.theme.globe.marker ||
            `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
          pinColor:
            window.theme.globe.pin ||
            `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
          satelliteColor:
            window.theme.globe.satellite ||
            `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
          scale: 1.1,
          viewAngle: 0.63,
          dayLength: 45e3,
          introLinesDuration: 2e3,
          introLinesColor:
            window.theme.globe.marker ||
            `rgb(${window.theme.r},${window.theme.g},${window.theme.b})`,
          maxPins: 300,
          maxMarkers: 100,
        })),
          o.remove(),
          e.append(this.globe.domElement),
          (this._animate = () => {
            window.mods.globe.globe && window.mods.globe.globe.tick(),
              window.mods.globe._animate &&
                setTimeout(() => {
                  try {
                    requestAnimationFrame(window.mods.globe._animate);
                  } catch (e) {
                    console.warn(e);
                  }
                }, 1e3 / 30);
          }),
          this.globe.init(window.theme.colors.light_black, () => {
            this._animate(), window.audioManager.scan.play();
          }),
          (this.resizeHandler = () => {
            let e = document.querySelector("div#mod_globe canvas");
            (window.mods.globe.globe.camera.aspect =
              e.offsetWidth / e.offsetHeight),
              window.mods.globe.globe.camera.updateProjectionMatrix(),
              window.mods.globe.globe.renderer.setSize(
                e.offsetWidth,
                e.offsetHeight
              );
          }),
          window.addEventListener("resize", this.resizeHandler),
          (this.conns = []),
          (this.addConn = (e) => {
            let o = null;
            try {
              o = window.mods.netstat.geoLookup.get(e);
            } catch {}
            let t = null !== o ? o.location : {};
            if (t.latitude && t.longitude) {
              const o = Number(t.latitude),
                n = Number(t.longitude);
              window.mods.globe.conns.push({
                ip: e,
                pin: window.mods.globe.globe.addPin(o, n, "", 1.2),
              });
            }
          }),
          (this.removeConn = (e) => {
            let o = this.conns.findIndex((o) => o.ip === e);
            this.conns[o].pin.remove(), this.conns.splice(o, 1);
          });
        let t = [];
        for (var n = 0; n < 2; n++)
          for (var i = 0; i < 3; i++)
            t.push({
              lat: 50 * n - 30 + 15 * Math.random(),
              lon: 120 * i - 120 + 30 * n,
              altitude: Math.random() * (1.7 - 1.3) + 1.3,
            });
        this.globe.addConstellation(t);
      }, 2e3),
      setTimeout(() => {
        this.updateLoc(),
          (this.locUpdater = setInterval(() => {
            this.updateLoc();
          }, 1e3)),
          this.updateConns(),
          (this.connsUpdater = setInterval(() => {
            this.updateConns();
          }, 3e3));
      }, 4e3);
  }
  addRandomConnectedMarkers() {
    const e = this.getRandomInRange(40, 90, 3),
      o = this.getRandomInRange(-180, 0, 3);
    this.globe.addMarker(e, o, ""),
      this.globe.addMarker(e - 20, o + 150, "", !0);
  }
  addTemporaryConnectedMarker(e) {
    let o = window.mods.netstat.geoLookup.get(e),
      t = null !== o ? o.location : {};
    if (t.latitude && t.longitude) {
      const o = Number(t.latitude),
        n = Number(t.longitude);
      window.mods.globe.conns.push({
        ip: e,
        pin: window.mods.globe.globe.addPin(o, n, "", 1.2),
      });
      let i = window.mods.globe.globe.addMarker(o, n, "", !0);
      setTimeout(() => {
        i.remove();
      }, 3e3);
    }
  }
  removeMarkers() {
    this.globe.markers.forEach((e) => {
      e.remove();
    }),
      (this.globe.markers = []);
  }
  removePins() {
    this.globe.pins.forEach((e) => {
      e.remove();
    }),
      (this.globe.pins = []);
  }
  getRandomInRange(e, o, t) {
    return 1 * (Math.random() * (o - e) + e).toFixed(t);
  }
  updateLoc() {
    window.mods.netstat.offline
      ? (document
          .querySelector("div#mod_globe")
          .setAttribute("class", "offline"),
        (document.querySelector("i.mod_globe_headerInfo").innerText =
          "(OFFLINE)"),
        this.removePins(),
        this.removeMarkers(),
        (this.conns = []),
        (this.lastgeo = { latitude: 0, longitude: 0 }))
      : this.updateConOnlineConnection()
          .then(() => {
            document.querySelector("div#mod_globe").setAttribute("class", "");
          })
          .catch(() => {
            document.querySelector("i.mod_globe_headerInfo").innerText =
              "UNKNOWN";
          });
  }
  async updateConOnlineConnection() {
    let e = window.mods.netstat.ipinfo.geo;
    (e.latitude = Math.round(1e4 * e.latitude) / 1e4),
      (e.longitude = Math.round(1e4 * e.longitude) / 1e4),
      (e.latitude === this.lastgeo.latitude &&
        e.longitude === this.lastgeo.longitude) ||
        ((document.querySelector(
          "i.mod_globe_headerInfo"
        ).innerText = `${e.latitude}, ${e.longitude}`),
        this.removePins(),
        this.removeMarkers(),
        (this.conns = []),
        (this._locPin = this.globe.addPin(e.latitude, e.longitude, "", 1.2)),
        (this._locMarker = this.globe.addMarker(
          e.latitude,
          e.longitude,
          "",
          !1,
          1.2
        ))),
      (this.lastgeo = e),
      document.querySelector("div#mod_globe").setAttribute("class", "");
  }
  updateConns() {
    if (!window.mods.globe.globe || window.mods.netstat.offline) return !1;
    window.si.networkConnections().then((e) => {
      let o = [];
      e.forEach((e) => {
        let t = e.peeraddress,
          n;
        "ESTABLISHED" === e.state &&
          "0.0.0.0" !== t &&
          "127.0.0.1" !== t &&
          "::" !== t &&
          o.push(t);
      }),
        this.conns.forEach((e) => {
          -1 !== o.indexOf(e.ip)
            ? o.splice(o.indexOf(e.ip), 1)
            : this.removeConn(e.ip);
        }),
        o.forEach((e) => {
          this.addConn(e);
        });
    });
  }
}
module.exports = { LocationGlobe };
