class RAMwatcher {
  constructor(t) {
    if (!t) throw "Missing parameters";
    this.parent = document.getElementById(t);
    let e = document.createElement("div"),
      a =
        '<div id="mod_ramwatcher_inner">\n                <h1>MEMORY<i id="mod_ramwatcher_info"></i></h1>\n                <div id="mod_ramwatcher_pointmap">';
    for (var r = 0; r < 440; r++)
      a += '<div class="mod_ramwatcher_point free"></div>';
    (a +=
      '</div>\n                <div id="mod_ramwatcher_swapcontainer">\n                    <h1>SWAP</h1>\n                    <progress id="mod_ramwatcher_swapbar" max="100" value="0"></progress>\n                    <h3 id="mod_ramwatcher_swaptext">0.0 GiB</h3>\n                </div>\n        </div>'),
      (e.innerHTML = a),
      e.setAttribute("id", "mod_ramwatcher"),
      this.parent.append(e),
      (this.points = Array.from(
        document.querySelectorAll("div.mod_ramwatcher_point")
      )),
      this.shuffleArray(this.points),
      (this.currentlyUpdating = !1),
      this.updateInfo(),
      (this.infoUpdater = setInterval(() => {
        this.updateInfo();
      }, 1500));
  }
  updateInfo() {
    this.currentlyUpdating ||
      ((this.currentlyUpdating = !0),
      window.si.mem().then((t) => {
        if (t.free + t.used !== t.total)
          throw "RAM Watcher Error: Bad memory values";
        let e = Math.round((440 * t.active) / t.total),
          a = Math.round((440 * (t.available - t.free)) / t.total);
        this.points.slice(0, e).forEach((t) => {
          "mod_ramwatcher_point active" !== t.attributes.class.value &&
            t.setAttribute("class", "mod_ramwatcher_point active");
        }),
          this.points.slice(e, e + a).forEach((t) => {
            "mod_ramwatcher_point available" !== t.attributes.class.value &&
              t.setAttribute("class", "mod_ramwatcher_point available");
          }),
          this.points.slice(e + a, this.points.length).forEach((t) => {
            "mod_ramwatcher_point free" !== t.attributes.class.value &&
              t.setAttribute("class", "mod_ramwatcher_point free");
          });
        let r = Math.round((t.total / 1073742e3) * 10) / 10,
          i = Math.round((t.active / 1073742e3) * 10) / 10;
        document.getElementById(
          "mod_ramwatcher_info"
        ).innerText = `USING ${i} OUT OF ${r} GiB`;
        let o = Math.round((100 * t.swapused) / t.swaptotal);
        document.getElementById("mod_ramwatcher_swapbar").value = o || 0;
        let n = Math.round((t.swapused / 1073742e3) * 10) / 10;
        (document.getElementById(
          "mod_ramwatcher_swaptext"
        ).innerText = `${n} GiB`),
          (this.currentlyUpdating = !1);
      }));
  }
  shuffleArray(t) {
    for (let e = t.length - 1; e > 0; e--) {
      let a = Math.floor(Math.random() * (e + 1));
      [t[e], t[a]] = [t[a], t[e]];
    }
  }
}
module.exports = { RAMwatcher };
