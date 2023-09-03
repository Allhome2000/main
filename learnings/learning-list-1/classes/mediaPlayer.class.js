class MediaPlayer {
  constructor(e) {
    const t = "modal_" + e.modalId,
      n = e.type,
      s = require("./assets/icons/file-icons.json"),
      l = `rgb(${window.theme.r}, ${window.theme.g}, ${window.theme.b})`,
      i = document.getElementById(t).querySelector(".media_container"),
      u = document.getElementById(t).querySelector(n),
      d = document.getElementById(t).querySelector(".media_controls"),
      r = document.getElementById(t).querySelector(".playpause"),
      o = document.getElementById(t).querySelector(".volume_icon"),
      a = document.getElementById(t).querySelector(".volume"),
      c = document.getElementById(t).querySelector(".volume_bar"),
      m = document.getElementById(t).querySelector(".progress"),
      h = document.getElementById(t).querySelector(".progress_bar"),
      v = document.getElementById(t).querySelector(".fs"),
      f = document.getElementById(t).querySelector(".media_time");
    let g = !1,
      p = !0,
      y;
    (u.controls = !1),
      d.setAttribute("data-state", "visible"),
      (this.changeButtonState = (e) => {
        u.paused || u.ended
          ? (r.setAttribute("data-state", "play"),
            (r.innerHTML = `\n                    <svg viewBox="0 0 ${s.play.width} ${s.play.height}" fill="${l}">\n                        ${s.play.svg}\n                    </svg>`))
          : (r.setAttribute("data-state", "pause"),
            (r.innerHTML = `\n                    <svg viewBox="0 0 ${s.pause.width} ${s.pause.height}" fill="${l}">\n                        ${s.pause.svg}\n                    </svg>`));
      }),
      (this.setFullscreenData = (e) => {
        if (null === v) return;
        i.setAttribute("data-fullscreen", !!e),
          v.setAttribute(
            "data-state",
            e ? "cancel-fullscreen" : "go-fullscreen"
          );
        const t = e ? "fullscreen-exit" : "fullscreen";
        v.innerHTML = `\n                <svg viewBox="0 0 ${s[t].width} ${s[t].height}" fill="${l}">\n                    ${s[t].svg}\n                </svg>`;
      }),
      (this.handleFullscreen = () => {
        document.fullscreenElement
          ? (document.exitFullscreen(),
            this.setFullscreenData(!1),
            i.removeEventListener("mousemove", this.handleFullscreenControls),
            (p = !0),
            clearTimeout(y),
            this.fullscreenVisible())
          : (i.requestFullscreen(),
            this.setFullscreenData(!0),
            (p = !1),
            this.fullscreenHidden(),
            i.addEventListener("mousemove", this.handleFullscreenControls));
      }),
      (this.handleFullscreenControls = () => {
        p ||
          ((p = !0),
          this.fullscreenVisible(),
          clearTimeout(y),
          (y = setTimeout(() => {
            (p = !1), this.fullscreenHidden();
          }, 2e3)));
      }),
      (this.fullscreenHidden = () => {
        (i.style.cursor = "none"), d.classList.add("fullscreen_hidden");
      }),
      (this.fullscreenVisible = () => {
        (i.style.cursor = "default"), d.classList.remove("fullscreen_hidden");
      }),
      (this.mediaTimeToHMS = (e) => {
        let t = parseInt(e);
        const n = parseInt(t / 3600);
        t %= 3600;
        const s = parseInt(t / 60);
        return (
          (t %= 60),
          (n < 10 ? "0" : "") +
            n +
            ":" +
            (s < 10 ? "0" : "") +
            s +
            ":" +
            (t < 10 ? "0" : "") +
            t
        );
      }),
      (this.updateVolume = (e) => {
        let t =
          (e - (c.offsetLeft + c.offsetParent.offsetLeft)) / c.clientWidth;
        t > 1 && (t = 1),
          t < 0 && (t = 0),
          (c.style.clip = "rect(0px, " + (100 * t) / 20 + "vw,2vh,0px)"),
          (u.volume = t),
          this.updateVolumeIcon(t);
      }),
      (this.updateVolumeIcon = (e) => {
        let t = e > 0 ? "volume" : "mute";
        o.innerHTML = `<svg viewBox="0 0 ${s[t].width} ${s[t].height}" fill="${l}">\n                                        ${s[t].svg}\n                                    </svg>`;
      }),
      u.addEventListener("loadedmetadata", () => {
        f.textContent = "00:00:00";
      }),
      u.addEventListener(
        "play",
        () => {
          this.changeButtonState("playpause");
        },
        !1
      ),
      u.addEventListener(
        "pause",
        () => {
          this.changeButtonState("playpause");
        },
        !1
      ),
      u.addEventListener("timeupdate", () => {
        (h.style.width = Math.floor((u.currentTime / u.duration) * 100) + "%"),
          (f.textContent = this.mediaTimeToHMS(u.currentTime));
      }),
      a.addEventListener("mousedown", (e) => {
        (g = !0), (u.muted = !1), this.updateVolume(e.pageX);
      }),
      o.addEventListener("click", () => {
        if (((u.muted = !u.muted), u.muted)) {
          let e = "mute";
          o.innerHTML = `<svg viewBox="0 0 ${s[e].width} ${s[e].height}" fill="${l}">\n                                        ${s[e].svg}\n                                    </svg>`;
        } else this.updateVolumeIcon(u.volume);
      }),
      m.addEventListener("click", function (e) {
        const t =
          (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) /
          this.offsetWidth;
        u.currentTime = t * u.duration;
      }),
      r.addEventListener("click", () => {
        u.paused || u.ended ? u.play() : u.pause();
      }),
      v &&
        v.addEventListener("click", () => {
          this.handleFullscreen();
        }),
      document.addEventListener("fullscreenchange", () => {
        this.setFullscreenData(!!document.fullscreenElement);
      }),
      document.addEventListener("mouseup", (e) => {
        g && ((g = !1), this.updateVolume(e.pageX));
      }),
      document.addEventListener("mousemove", (e) => {
        g && this.updateVolume(e.pageX);
      });
  }
}
module.exports = { MediaPlayer };
