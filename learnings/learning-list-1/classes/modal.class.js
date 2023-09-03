window.modals = {};
class Modal {
  constructor(e, t) {
    if (!e || !e.type) throw "Missing parameters";
    for (
      this.type = e.type, this.id = require("nanoid").nanoid();
      void 0 !== window.modals[this.id];

    )
      this.id = require("nanoid")();
    (this.title = e.title || e.type || "Modal window"),
      (this.message = e.message || "Lorem ipsum dolor sit amet."),
      (this.onclose = t),
      (this.classes = "modal_popup");
    let s = [],
      o = [],
      i = 0;
    switch (((window.modals[this.id] = {}), this.type)) {
      case "error":
        (this.classes += " error"),
          (i = 1500),
          s.push(
            {
              label: "PANIC",
              action: "window.modals['" + this.id + "'].close();",
            },
            { label: "RELOAD", action: "window.location.reload(true);" }
          ),
          o.push("tr-clip", "bl-rect", "r-clip");
        break;
      case "warning":
        (this.classes += " warning"),
          (i = 1e3),
          s.push({
            label: "OK",
            action: "window.modals['" + this.id + "'].close();",
          }),
          o.push("bl-clip", "tr-clip", "r-rect", "b-rect");
        break;
      case "custom":
        (this.classes += " info custom"),
          (i = 500),
          (s = e.buttons || []),
          s.push({
            label: "Close",
            action: "window.modals['" + this.id + "'].close();",
          }),
          o.push("tr-clip", "bl-clip");
        break;
      default:
        (this.classes += " info"),
          (i = 500),
          s.push({
            label: "OK",
            action: "window.modals['" + this.id + "'].close();",
          }),
          o.push("tr-clip", "bl-clip");
        break;
    }
    let n = `<div id="modal_${this.id}" class="${
      this.classes
    }" style="z-index:${
      i + Object.keys(window.modals).length
    };" augmented-ui="${o.join(" ")} exe">\n            <h1>${
      this.title
    }</h1>\n            ${
      "custom" === this.type ? e.html : "<h5>" + this.message + "</h5>"
    }\n            <div>`;
    s.forEach((e) => {
      n += `<button onclick="${e.action}">${e.label}</button>`;
    }),
      (n += "</div>\n        </div>"),
      (this.close = () => {
        let e = document.getElementById("modal_" + this.id);
        e.setAttribute("class", "modal_popup " + this.type + " blink"),
          window.audioManager.denied.play(),
          setTimeout(() => {
            e.remove(), delete window.modals[this.id];
          }, 100),
          "function" == typeof this.onclose && this.onclose();
      }),
      (this.focus = () => {
        let e;
        document
          .getElementById("modal_" + this.id)
          .setAttribute("class", this.classes + " focus"),
          Object.keys(window.modals).forEach((e) => {
            e !== this.id && window.modals[e].unfocus();
          });
      }),
      (this.unfocus = () => {
        let e;
        document
          .getElementById("modal_" + this.id)
          .setAttribute("class", this.classes);
      });
    let l = document.createElement("div");
    l.innerHTML = n;
    let a = l.firstChild;
    switch (
      (a.addEventListener("mousedown", () => {
        this.focus();
      }),
      a.addEventListener("touchstart", () => {
        this.focus();
      }),
      this.type)
    ) {
      case "error":
        window.audioManager.error.play();
        break;
      case "warning":
        window.audioManager.alarm.play();
        break;
      default:
        window.audioManager.info.play();
        break;
    }
    (window.modals[this.id] = this), document.body.appendChild(a), this.focus();
    let d = document.getElementById(`modal_${this.id}`),
      c = document.querySelector(`div#modal_${this.id} > h1:first-child`);
    function r(e) {
      (d.lastMouseX = e.clientX),
        (d.lastMouseY = e.clientY),
        d.setAttribute(
          "style",
          `${d.zindex}background: rgba(var(--color_r), var(--color_g), var(--color_b), 0.5);left: ${d.posX}px;top: ${d.posY}px;`
        ),
        window.addEventListener("mousemove", u),
        window.addEventListener("mouseup", h);
    }
    function u(e) {
      (d.posX = d.posX + (e.clientX - d.lastMouseX)),
        (d.posY = d.posY + (e.clientY - d.lastMouseY)),
        (d.lastMouseX = e.clientX),
        (d.lastMouseY = e.clientY),
        d.setAttribute(
          "style",
          `${d.zindex}background: rgba(var(--color_r), var(--color_g), var(--color_b), 0.5);left: ${d.posX}px;top: ${d.posY}px;`
        );
    }
    function h(e) {
      window.removeEventListener("mousemove", u),
        d.setAttribute(
          "style",
          `${d.zindex}left: ${d.posX}px;top: ${d.posY}px;`
        ),
        window.removeEventListener("mouseup", h);
    }
    function p(e) {
      (d.lastMouseX = e.changedTouches[0].clientX),
        (d.lastMouseY = e.changedTouches[0].clientY),
        d.setAttribute(
          "style",
          `${d.zindex}background: rgba(var(--color_r), var(--color_g), var(--color_b), 0.5);left: ${d.posX}px;top: ${d.posY}px;`
        ),
        window.addEventListener("touchmove", m),
        window.addEventListener("touchend", w);
    }
    function m(e) {
      (d.posX = d.posX + (e.changedTouches[0].clientX - d.lastMouseX)),
        (d.posY = d.posY + (e.changedTouches[0].clientY - d.lastMouseY)),
        (d.lastMouseX = e.changedTouches[0].clientX),
        (d.lastMouseY = e.changedTouches[0].clientY),
        d.setAttribute(
          "style",
          `${d.zindex}background: rgba(var(--color_r), var(--color_g), var(--color_b), 0.5);left: ${d.posX}px;top: ${d.posY}px;`
        );
    }
    function w(e) {
      window.removeEventListener("touchmove", m),
        d.setAttribute(
          "style",
          `${d.zindex}left: ${d.posX}px;top: ${d.posY}px;`
        ),
        window.removeEventListener("touchend", w);
    }
    return (
      (d.zindex = d.getAttribute("style")),
      setTimeout(() => {
        let e = d.getBoundingClientRect();
        (d.posX = e.left), (d.posY = e.top);
      }, 500),
      c.addEventListener("mousedown", r),
      c.addEventListener("touchstart", p),
      this.id
    );
  }
}
module.exports = { Modal };
