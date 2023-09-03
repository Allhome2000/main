class HardwareInspector {
  constructor(e) {
    if (!e) throw "Missing parameters";
    (this.parent = document.getElementById(e)),
      (this._element = document.createElement("div")),
      this._element.setAttribute("id", "mod_hardwareInspector"),
      (this._element.innerHTML =
        '<div id="mod_hardwareInspector_inner">\n            <div>\n                <h1>MANUFACTURER</h1>\n                <h2 id="mod_hardwareInspector_manufacturer" >NONE</h2>\n            </div>\n            <div>\n                <h1>MODEL</h1>\n                <h2 id="mod_hardwareInspector_model" >NONE</h2>\n            </div>\n            <div>\n                <h1>CHASSIS</h1>\n                <h2 id="mod_hardwareInspector_chassis" >NONE</h2>\n            </div>\n        </div>'),
      this.parent.append(this._element),
      this.updateInfo(),
      (this.infoUpdater = setInterval(() => {
        this.updateInfo();
      }, 2e4));
  }
  updateInfo() {
    window.si.system().then((e) => {
      window.si.chassis().then((t) => {
        (document.getElementById(
          "mod_hardwareInspector_manufacturer"
        ).innerText = this._trimDataString(e.manufacturer)),
          (document.getElementById("mod_hardwareInspector_model").innerText =
            this._trimDataString(e.model, e.manufacturer, t.type)),
          (document.getElementById("mod_hardwareInspector_chassis").innerText =
            t.type);
      });
    });
  }
  _trimDataString(e, ...t) {
    return e
      .trim()
      .split(" ")
      .filter((e) => "object" != typeof t || !t.includes(e))
      .slice(0, 2)
      .join(" ");
  }
}
module.exports = { HardwareInspector };
