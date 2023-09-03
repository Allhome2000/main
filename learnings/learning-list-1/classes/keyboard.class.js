class Keyboard {
  constructor(e) {
    if (!e.layout || !e.container) throw "Missing options";
    const t = JSON.parse(
      require("fs").readFileSync(e.layout, { encoding: "utf-8" })
    );
    (this.ctrlseq = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]),
      (this.container = document.getElementById(e.container)),
      (this.linkedToTerm = !0),
      (this.detach = () => {
        this.linkedToTerm = !1;
      }),
      (this.attach = () => {
        this.linkedToTerm = !0;
      }),
      (this.container.dataset.isShiftOn = !1),
      (this.container.dataset.isCapsLckOn = !1),
      (this.container.dataset.isAltOn = !1),
      (this.container.dataset.isCtrlOn = !1),
      (this.container.dataset.isFnOn = !1),
      (this.container.dataset.passwordMode = !1),
      (this._shortcuts = {
        CtrlAltShift: [],
        CtrlAlt: [],
        CtrlShift: [],
        AltShift: [],
        Ctrl: [],
        Alt: [],
        Shift: [],
      }),
      window.shortcuts.forEach((e) => {
        let t = Object.assign({}, e),
          r = t.trigger.split("+");
        t.trigger = r.pop();
        let a = ["Ctrl", "Alt", "Shift"];
        r.sort((e, t) => a.indexOf(e) - a.indexOf(t));
        let s = r.join("");
        if ("app" === t.type && "TAB_X" === t.action && "X" === t.trigger)
          for (let e = 1; e <= 5; e++) {
            let r = Object.assign({}, t);
            (r.trigger = `${e}`),
              (r.action = `TAB_${e}`),
              this._shortcuts[s].push(r);
          }
        else this._shortcuts[s].push(t);
      }),
      Object.keys(t).forEach((e) => {
        (this.container.innerHTML +=
          '<div class="keyboard_row" id="' + e + '"></div>'),
          t[e].forEach((t) => {
            let r = document.createElement("div");
            r.setAttribute("class", "keyboard_key"),
              " " === t.cmd
                ? r.setAttribute("id", "keyboard_spacebar")
                : "\r" === t.cmd
                ? (r.setAttribute("class", "keyboard_key keyboard_enter"),
                  (r.innerHTML = `<h1>${t.name}</h1>`))
                : (r.innerHTML = `\n                        <h5>${
                    t.altshift_name || ""
                  }</h5>\n                        <h4>${
                    t.fn_name || ""
                  }</h4>\n                        <h3>${
                    t.alt_name || ""
                  }</h3>\n                        <h2>${
                    t.shift_name || ""
                  }</h2>\n                        <h1>${t.name || ""}</h1>`);
            let a = null;
            if (t.name.startsWith("ESCAPED|-- ICON: ")) {
              switch (((t.name = t.name.substr(17)), t.name)) {
                case "ARROW_UP":
                  a =
                    '<svg viewBox="0 0 24.00 24.00"><path fill-opacity="1" d="m12.00004 7.99999 4.99996 5h-2.99996v4.00001h-4v-4.00001h-3z"/><path stroke-linejoin="round" fill-opacity="0.65" d="m4 3h16c1.1046 0 1-0.10457 1 1v16c0 1.1046 0.1046 1-1 1h-16c-1.10457 0-1 0.1046-1-1v-16c0-1.10457-0.10457-1 1-1zm0 1v16h16v-16z"/></svg>';
                  break;
                case "ARROW_LEFT":
                  a =
                    '<svg viewBox="0 0 24.00 24.00"><path fill-opacity="1" d="m7.500015 12.499975 5-4.99996v2.99996h4.00001v4h-4.00001v3z"/><path stroke-linejoin="round" fill-opacity="0.65" d="m4 3h16c1.1046 0 1-0.10457 1 1v16c0 1.1046 0.1046 1-1 1h-16c-1.10457 0-1 0.1046-1-1v-16c0-1.10457-0.10457-1 1-1zm0 1v16h16v-16z"/></svg>';
                  break;
                case "ARROW_DOWN":
                  a =
                    '<svg viewBox="0 0 24.00 24.00"><path fill-opacity="1" d="m12 17-4.99996-5h2.99996v-4.00001h4v4.00001h3z"/><path stroke-linejoin="round" fill-opacity="0.65" d="m4 3h16c1.1046 0 1-0.10457 1 1v16c0 1.1046 0.1046 1-1 1h-16c-1.10457 0-1 0.1046-1-1v-16c0-1.10457-0.10457-1 1-1zm0 1v16h16v-16z"/></svg>';
                  break;
                case "ARROW_RIGHT":
                  a =
                    '<svg viewBox="0 0 24.00 24.00"><path fill-opacity="1" d="m16.500025 12.500015-5 4.99996v-2.99996h-4.00001v-4h4.00001v-3z"/><path stroke-linejoin="round" fill-opacity="0.65" d="m4 3h16c1.1046 0 1-0.10457 1 1v16c0 1.1046 0.1046 1-1 1h-16c-1.10457 0-1 0.1046-1-1v-16c0-1.10457-0.10457-1 1-1zm0 1v16h16v-16z"/></svg>';
                  break;
                default:
                  a =
                    '<svg viewBox="0 0 24.00 24.00"><path fill="#ff0000" fill-opacity="1" d="M 8.27125,2.9978L 2.9975,8.27125L 2.9975,15.7275L 8.27125,21.0012L 15.7275,21.0012C 17.485,19.2437 21.0013,15.7275 21.0013,15.7275L 21.0013,8.27125L 15.7275,2.9978M 9.10125,5L 14.9025,5L 18.9988,9.10125L 18.9988,14.9025L 14.9025,18.9988L 9.10125,18.9988L 5,14.9025L 5,9.10125M 9.11625,7.705L 7.705,9.11625L 10.5912,12.0025L 7.705,14.8825L 9.11625,16.2937L 12.0025,13.4088L 14.8825,16.2937L 16.2938,14.8825L 13.4087,12.0025L 16.2938,9.11625L 14.8825,7.705L 12.0025,10.5913"/></svg>';
              }
              r.innerHTML = a;
            }
            Object.keys(t).forEach((e) => {
              for (let r = 1; r < this.ctrlseq.length; r++)
                t[e] = t[e].replace("~~~CTRLSEQ" + r + "~~~", this.ctrlseq[r]);
              e.endsWith("cmd") && (r.dataset[e] = t[e]);
            }),
              document.getElementById(e).appendChild(r);
          });
      }),
      this.container.childNodes.forEach((e) => {
        e.childNodes.forEach((e) => {
          let t = document.querySelectorAll(".keyboard_enter");
          e.attributes.class.value.endsWith("keyboard_enter")
            ? ((e.onmousedown = (r) => {
                this.pressKey(e),
                  (e.holdTimeout = setTimeout(() => {
                    e.holdInterval = setInterval(() => {
                      this.pressKey(e);
                    }, 70);
                  }, 400)),
                  t.forEach((e) => {
                    e.setAttribute(
                      "class",
                      "keyboard_key active keyboard_enter"
                    );
                  }),
                  window.keyboard.linkedToTerm &&
                    window.term[window.currentTerm].term.focus(),
                  "false" == this.container.dataset.passwordMode &&
                    window.audioManager.granted.play(),
                  r.preventDefault();
              }),
              (e.onmouseup = () => {
                clearTimeout(e.holdTimeout),
                  clearInterval(e.holdInterval),
                  t.forEach((e) => {
                    e.setAttribute(
                      "class",
                      "keyboard_key blink keyboard_enter"
                    );
                  }),
                  setTimeout(() => {
                    t.forEach((e) => {
                      e.setAttribute("class", "keyboard_key keyboard_enter");
                    });
                  }, 100);
              }))
            : ((e.onmousedown = (t) => {
                if (/^ESCAPED\|-- (CTRL|SHIFT|ALT){1}.*/.test(e.dataset.cmd)) {
                  let t = e.dataset.cmd.substr(11);
                  t.startsWith("CTRL") &&
                    (this.container.dataset.isCtrlOn = "true"),
                    t.startsWith("SHIFT") &&
                      (this.container.dataset.isShiftOn = "true"),
                    t.startsWith("ALT") &&
                      (this.container.dataset.isAltOn = "true");
                } else
                  (e.holdTimeout = setTimeout(() => {
                    e.holdInterval = setInterval(() => {
                      this.pressKey(e);
                    }, 70);
                  }, 400)),
                    this.pressKey(e);
                window.keyboard.linkedToTerm &&
                  window.term[window.currentTerm].term.focus(),
                  "false" == this.container.dataset.passwordMode &&
                    window.audioManager.stdin.play(),
                  t.preventDefault();
              }),
              (e.onmouseup = (t) => {
                if (/^ESCAPED\|-- (CTRL|SHIFT|ALT){1}.*/.test(e.dataset.cmd)) {
                  let t = e.dataset.cmd.substr(11);
                  t.startsWith("CTRL") &&
                    (this.container.dataset.isCtrlOn = "false"),
                    t.startsWith("SHIFT") &&
                      (this.container.dataset.isShiftOn = "false"),
                    t.startsWith("ALT") &&
                      (this.container.dataset.isAltOn = "false");
                } else
                  clearTimeout(e.holdTimeout), clearInterval(e.holdInterval);
                e.setAttribute("class", "keyboard_key blink"),
                  setTimeout(() => {
                    e.setAttribute("class", "keyboard_key");
                  }, 100);
              })),
            (e.onmouseleave = () => {
              clearTimeout(e.holdTimeout), clearInterval(e.holdInterval);
            });
        });
      }),
      this.container.addEventListener("touchstart", (e) => {
        e.preventDefault();
        for (let t = 0; t < e.changedTouches.length; t++) {
          let r = e.changedTouches[t].target.parentElement;
          "svg" === r.tagName && (r = r.parentElement),
            r.getAttribute("class").startsWith("keyboard_key")
              ? (r.setAttribute("class", r.getAttribute("class") + " active"),
                r.onmousedown({ preventDefault: () => !0 }))
              : ((r = e.changedTouches[t].target),
                r.getAttribute("class").startsWith("keyboard_key") &&
                  (r.setAttribute("class", r.getAttribute("class") + " active"),
                  r.onmousedown({ preventDefault: () => !0 })));
        }
      });
    let r = (e) => {
      e.preventDefault();
      for (let t = 0; t < e.changedTouches.length; t++) {
        let r = e.changedTouches[t].target.parentElement;
        "svg" === r.tagName && (r = r.parentElement),
          r.getAttribute("class").startsWith("keyboard_key")
            ? (r.setAttribute(
                "class",
                r.getAttribute("class").replace("active", "")
              ),
              r.onmouseup({ preventDefault: () => !0 }))
            : ((r = e.changedTouches[t].target),
              r.getAttribute("class").startsWith("keyboard_key") &&
                (r.setAttribute(
                  "class",
                  r.getAttribute("class").replace("active", "")
                ),
                r.onmouseup({ preventDefault: () => !0 })));
      }
    };
    this.container.addEventListener("touchend", r),
      this.container.addEventListener("touchcancel", r);
    let a = (e) => {
      let t;
      t = '"' === e.key ? '\\"' : e.key;
      let r = document.querySelector('div.keyboard_key[data-cmd="' + t + '"]');
      return (
        null === r &&
          (r = document.querySelector(
            'div.keyboard_key[data-shift_cmd="' + t + '"]'
          )),
        null === r &&
          "ShiftLeft" === e.code &&
          (r = document.querySelector(
            'div.keyboard_key[data-cmd="ESCAPED|-- SHIFT: LEFT"]'
          )),
        null === r &&
          "ShiftRight" === e.code &&
          (r = document.querySelector(
            'div.keyboard_key[data-cmd="ESCAPED|-- SHIFT: RIGHT"]'
          )),
        null === r &&
          "ControlLeft" === e.code &&
          (r = document.querySelector(
            'div.keyboard_key[data-cmd="ESCAPED|-- CTRL: LEFT"]'
          )),
        null === r &&
          "ControlRight" === e.code &&
          (r = document.querySelector(
            'div.keyboard_key[data-cmd="ESCAPED|-- CTRL: RIGHT"]'
          )),
        null === r &&
          "AltLeft" === e.code &&
          (r = document.querySelector(
            'div.keyboard_key[data-cmd="ESCAPED|-- FN: ON"]'
          )),
        null === r &&
          "AltRight" === e.code &&
          (r = document.querySelector(
            'div.keyboard_key[data-cmd="ESCAPED|-- ALT: RIGHT"]'
          )),
        null === r &&
          "CapsLock" === e.code &&
          (r = document.querySelector(
            'div.keyboard_key[data-cmd="ESCAPED|-- CAPSLCK: ON"]'
          )),
        null === r &&
          "Escape" === e.code &&
          (r = document.querySelector('div.keyboard_key[data-cmd=""]')),
        null === r &&
          "Backspace" === e.code &&
          (r = document.querySelector('div.keyboard_key[data-cmd="\b"]')),
        null === r &&
          "ArrowUp" === e.code &&
          (r = document.querySelector('div.keyboard_key[data-cmd="OA"]')),
        null === r &&
          "ArrowLeft" === e.code &&
          (r = document.querySelector('div.keyboard_key[data-cmd="OD"]')),
        null === r &&
          "ArrowDown" === e.code &&
          (r = document.querySelector('div.keyboard_key[data-cmd="OB"]')),
        null === r &&
          "ArrowRight" === e.code &&
          (r = document.querySelector('div.keyboard_key[data-cmd="OC"]')),
        null === r &&
          "Enter" === e.code &&
          (r = document.querySelectorAll("div.keyboard_key.keyboard_enter")),
        null === r &&
          (r = document.querySelector(
            'div.keyboard_key[data-ctrl_cmd="' + e.key + '"]'
          )),
        null === r &&
          (r = document.querySelector(
            'div.keyboard_key[data-alt_cmd="' + e.key + '"]'
          )),
        r
      );
    };
    (this.keydownHandler = (e) => {
      e.getModifierState("AltGraph") &&
        "AltRight" === e.code &&
        document
          .querySelector('div.keyboard_key[data-cmd="ESCAPED|-- CTRL: LEFT"]')
          .setAttribute("class", "keyboard_key"),
        ("ControlLeft" !== e.code && "ControlRight" !== e.code) ||
          (this.container.dataset.isCtrlOn = !0),
        ("ShiftLeft" !== e.code && "ShiftRight" !== e.code) ||
          (this.container.dataset.isShiftOn = !0),
        ("AltLeft" !== e.code && "AltRight" !== e.code) ||
          (this.container.dataset.isAltOn = !0),
        "CapsLock" === e.code &&
          "true" !== this.container.dataset.isCapsLckOn &&
          (this.container.dataset.isCapsLckOn = !0),
        "CapsLock" === e.code &&
          "true" === this.container.dataset.isCapsLckOn &&
          (this.container.dataset.isCapsLckOn = !1);
      let t = a(e);
      null !== t &&
        (t.length
          ? t.forEach((e) => {
              e.setAttribute("class", "keyboard_key active keyboard_enter");
            })
          : t.setAttribute("class", "keyboard_key active"),
        (!1 !== e.repeat &&
          (!0 !== e.repeat ||
            e.code.startsWith("Shift") ||
            e.code.startsWith("Alt") ||
            e.code.startsWith("Control") ||
            e.code.startsWith("Caps"))) ||
          ("false" == this.container.dataset.passwordMode &&
            window.audioManager.stdin.play()));
    }),
      (document.onkeydown = this.keydownHandler),
      (document.onkeyup = (e) => {
        if ("Control" === e.key && e.getModifierState("AltGraph")) return;
        ("ControlLeft" !== e.code && "ControlRight" !== e.code) ||
          (this.container.dataset.isCtrlOn = !1),
          ("ShiftLeft" !== e.code && "ShiftRight" !== e.code) ||
            (this.container.dataset.isShiftOn = !1),
          ("AltLeft" !== e.code && "AltRight" !== e.code) ||
            (this.container.dataset.isAltOn = !1);
        let t = a(e);
        null !== t &&
          (t.length
            ? (t.forEach((e) => {
                e.setAttribute("class", "keyboard_key blink keyboard_enter");
              }),
              setTimeout(() => {
                t.forEach((e) => {
                  e.setAttribute("class", "keyboard_key keyboard_enter");
                });
              }, 100))
            : (t.setAttribute("class", "keyboard_key blink"),
              setTimeout(() => {
                t.setAttribute("class", "keyboard_key");
              }, 100)),
          "false" == this.container.dataset.passwordMode &&
            "Enter" === e.key &&
            window.audioManager.granted.play());
      }),
      window.addEventListener("blur", () => {
        document.querySelectorAll("div.keyboard_key.active").forEach((e) => {
          e.setAttribute(
            "class",
            e.getAttribute("class").replace("active", "")
          ),
            e.onmouseup({ preventDefault: () => !0 });
        });
      });
  }
  pressKey(e) {
    let t = e.dataset.cmd || "",
      r = "";
    "true" === this.container.dataset.isCtrlOn && (r += "Ctrl"),
      "true" === this.container.dataset.isAltOn && (r += "Alt"),
      "true" === this.container.dataset.isShiftOn && (r += "Shift");
    let a = !1;
    if (
      (r.length > 1 &&
        this._shortcuts[r].forEach((e) => {
          if (!e.enabled) return;
          let r = e.trigger
            .toLowerCase()
            .replace("plus", "+")
            .replace("space", " ")
            .replace("tab", "\t")
            .replace(/backspace|delete/, "\b")
            .replace(/esc|escape/, this.ctrlseq[1])
            .replace(/return|enter/, "\r");
          if (t === r)
            if ("app" === e.type) window.useAppShortcut(e.action), (a = !0);
            else if ("shell" === e.type) {
              let t = e.linebreak ? writelr : write;
              window.term[window.currentTerm][t](e.action);
            } else console.warn(`${e.trigger} has unknown type`);
        }),
      !a)
    ) {
      if (
        ((("true" === this.container.dataset.isShiftOn &&
          e.dataset.shift_cmd) ||
          ("true" === this.container.dataset.isCapsLckOn &&
            e.dataset.shift_cmd)) &&
          (t = e.dataset.shift_cmd),
        "true" === this.container.dataset.isCapsLckOn &&
          e.dataset.capslck_cmd &&
          (t = e.dataset.capslck_cmd),
        "true" === this.container.dataset.isCtrlOn &&
          e.dataset.ctrl_cmd &&
          (t = e.dataset.ctrl_cmd),
        "true" === this.container.dataset.isAltOn &&
          e.dataset.alt_cmd &&
          (t = e.dataset.alt_cmd),
        "true" === this.container.dataset.isAltOn &&
          "true" === this.container.dataset.isShiftOn &&
          e.dataset.altshift_cmd &&
          (t = e.dataset.altshift_cmd),
        "true" === this.container.dataset.isFnOn &&
          e.dataset.fn_cmd &&
          (t = e.dataset.fn_cmd),
        "true" === this.container.dataset.isNextCircum &&
          ((t = this.addCircum(t)),
          (this.container.dataset.isNextCircum = "false")),
        "true" === this.container.dataset.isNextTrema &&
          ((t = this.addTrema(t)),
          (this.container.dataset.isNextTrema = "false")),
        "true" === this.container.dataset.isNextAcute &&
          ((t = this.addAcute(t)),
          (this.container.dataset.isNextAcute = "false")),
        "true" === this.container.dataset.isNextGrave &&
          ((t = this.addGrave(t)),
          (this.container.dataset.isNextGrave = "false")),
        "true" === this.container.dataset.isNextCaron &&
          ((t = this.addCaron(t)),
          (this.container.dataset.isNextCaron = "false")),
        "true" === this.container.dataset.isNextBar &&
          ((t = this.addBar(t)), (this.container.dataset.isNextBar = "false")),
        "true" === this.container.dataset.isNextBreve &&
          ((t = this.addBreve(t)),
          (this.container.dataset.isNextBreve = "false")),
        "true" === this.container.dataset.isNextTilde &&
          ((t = this.addTilde(t)),
          (this.container.dataset.isNextTilde = "false")),
        "true" === this.container.dataset.isNextMacron &&
          ((t = this.addMacron(t)),
          (this.container.dataset.isNextMacron = "false")),
        "true" === this.container.dataset.isNextCedilla &&
          ((t = this.addCedilla(t)),
          (this.container.dataset.isNextCedilla = "true")),
        "true" === this.container.dataset.isNextOverring &&
          ((t = this.addOverring(t)),
          (this.container.dataset.isNextOverring = "false")),
        "true" === this.container.dataset.isNextGreek &&
          ((t = this.toGreek(t)),
          (this.container.dataset.isNextGreek = "false")),
        "true" === this.container.dataset.isNextIotasub &&
          ((t = this.addIotasub(t)),
          (this.container.dataset.isNextIotasub = "false")),
        t.startsWith("ESCAPED|-- "))
      )
        switch (((t = t.substr(11)), t)) {
          case "CAPSLCK: ON":
            return (this.container.dataset.isCapsLckOn = "true"), !0;
          case "CAPSLCK: OFF":
            return (this.container.dataset.isCapsLckOn = "false"), !0;
          case "FN: ON":
            return (this.container.dataset.isFnOn = "true"), !0;
          case "FN: OFF":
            return (this.container.dataset.isFnOn = "false"), !0;
          case "CIRCUM":
            return (this.container.dataset.isNextCircum = "true"), !0;
          case "TREMA":
            return (this.container.dataset.isNextTrema = "true"), !0;
          case "ACUTE":
            return (this.container.dataset.isNextAcute = "true"), !0;
          case "GRAVE":
            return (this.container.dataset.isNextGrave = "true"), !0;
          case "CARON":
            return (this.container.dataset.isNextCaron = "true"), !0;
          case "BAR":
            return (this.container.dataset.isNextBar = "true"), !0;
          case "BREVE":
            return (this.container.dataset.isNextBreve = "true"), !0;
          case "TILDE":
            return (this.container.dataset.isNextTilde = "true"), !0;
          case "MACRON":
            return (this.container.dataset.isNextMacron = "true"), !0;
          case "CEDILLA":
            return (this.container.dataset.isNextCedilla = "true"), !0;
          case "OVERRING":
            return (this.container.dataset.isNextOverring = "true"), !0;
          case "GREEK":
            return (this.container.dataset.isNextGreek = "true"), !0;
          case "IOTASUB":
            return (this.container.dataset.isNextIotasub = "true"), !0;
        }
      if ("\n" === t)
        return (
          window.keyboard.linkedToTerm
            ? window.term[window.currentTerm].writelr("")
            : document.activeElement.dispatchEvent(
                new CustomEvent("change", { detail: "enter" })
              ),
          !0
        );
      if (window.keyboard.linkedToTerm)
        window.term[window.currentTerm].write(t);
      else {
        let e = !1;
        if (void 0 !== document.activeElement.value)
          switch (t) {
            case "\b":
              (document.activeElement.value =
                document.activeElement.value.slice(0, -1)),
                (e = !0);
              break;
            case "OD":
              document.activeElement.selectionStart--,
                (document.activeElement.selectionEnd =
                  document.activeElement.selectionStart);
              break;
            case "OC":
              document.activeElement.selectionEnd++,
                (document.activeElement.selectionStart =
                  document.activeElement.selectionEnd);
              break;
            default:
              -1 !== this.ctrlseq.indexOf(t.slice(0, 1)) ||
                (document.activeElement.value =
                  document.activeElement.value + t);
          }
        document.activeElement.dispatchEvent(
          new CustomEvent("input", { detail: e ? "delete" : "insert" })
        ),
          document.activeElement.focus();
      }
    }
  }
  togglePasswordMode() {
    let e = this.container.dataset.passwordMode;
    return (
      (e = "true" === e ? "false" : "true"),
      (this.container.dataset.passwordMode = e),
      (window.passwordMode = e),
      e
    );
  }
  addCircum(e) {
    switch (e) {
      case "a":
        return "â";
      case "A":
        return "Â";
      case "z":
        return "ẑ";
      case "Z":
        return "Ẑ";
      case "e":
        return "ê";
      case "E":
        return "Ê";
      case "y":
        return "ŷ";
      case "Y":
        return "Ŷ";
      case "u":
        return "û";
      case "U":
        return "Û";
      case "i":
        return "î";
      case "I":
        return "Î";
      case "o":
        return "ô";
      case "O":
        return "Ô";
      case "s":
        return "ŝ";
      case "S":
        return "Ŝ";
      case "g":
        return "ĝ";
      case "G":
        return "Ĝ";
      case "h":
        return "ĥ";
      case "H":
        return "Ĥ";
      case "j":
        return "ĵ";
      case "J":
        return "Ĵ";
      case "w":
        return "ŵ";
      case "W":
        return "Ŵ";
      case "c":
        return "ĉ";
      case "C":
        return "Ĉ";
      case "1":
        return "¹";
      case "2":
        return "²";
      case "3":
        return "³";
      case "4":
        return "⁴";
      case "5":
        return "⁵";
      case "6":
        return "⁶";
      case "7":
        return "⁷";
      case "8":
        return "⁸";
      case "9":
        return "⁹";
      case "0":
        return "⁰";
      default:
        return e;
    }
  }
  addTrema(e) {
    switch (e) {
      case "a":
        return "ä";
      case "A":
        return "Ä";
      case "e":
        return "ë";
      case "E":
        return "Ë";
      case "t":
        return "ẗ";
      case "y":
        return "ÿ";
      case "Y":
        return "Ÿ";
      case "u":
        return "ü";
      case "U":
        return "Ü";
      case "i":
        return "ï";
      case "I":
        return "Ï";
      case "o":
        return "ö";
      case "O":
        return "Ö";
      case "h":
        return "ḧ";
      case "H":
        return "Ḧ";
      case "w":
        return "ẅ";
      case "W":
        return "Ẅ";
      case "x":
        return "ẍ";
      case "X":
        return "Ẍ";
      default:
        return e;
    }
  }
  addAcute(e) {
    switch (e) {
      case "a":
        return "á";
      case "A":
        return "Á";
      case "c":
        return "ć";
      case "C":
        return "Ć";
      case "e":
        return "é";
      case "E":
        return "E";
      case "g":
        return "ǵ";
      case "G":
        return "Ǵ";
      case "i":
        return "í";
      case "I":
        return "Í";
      case "j":
        return "ȷ́";
      case "J":
        return "J́";
      case "k":
        return "ḱ";
      case "K":
        return "Ḱ";
      case "l":
        return "ĺ";
      case "L":
        return "Ĺ";
      case "m":
        return "ḿ";
      case "M":
        return "Ḿ";
      case "n":
        return "ń";
      case "N":
        return "Ń";
      case "o":
        return "ó";
      case "O":
        return "Ó";
      case "p":
        return "ṕ";
      case "P":
        return "Ṕ";
      case "r":
        return "ŕ";
      case "R":
        return "Ŕ";
      case "s":
        return "ś";
      case "S":
        return "Ś";
      case "u":
        return "ú";
      case "U":
        return "Ú";
      case "v":
        return "v́";
      case "V":
        return "V́";
      case "w":
        return "ẃ";
      case "W":
        return "Ẃ";
      case "y":
        return "ý";
      case "Y":
        return "Ý";
      case "z":
        return "ź";
      case "Z":
        return "Ź";
      case "ê":
        return "ế";
      case "Ê":
        return "Ế";
      case "ç":
        return "ḉ";
      case "Ç":
        return "Ḉ";
      default:
        return e;
    }
  }
  addGrave(e) {
    switch (e) {
      case "a":
        return "à";
      case "A":
        return "À";
      case "e":
        return "è";
      case "E":
        return "È";
      case "i":
        return "ì";
      case "I":
        return "Ì";
      case "m":
        return "m̀";
      case "M":
        return "M̀";
      case "n":
        return "ǹ";
      case "N":
        return "Ǹ";
      case "o":
        return "ò";
      case "O":
        return "Ò";
      case "u":
        return "ù";
      case "U":
        return "Ù";
      case "v":
        return "v̀";
      case "V":
        return "V̀";
      case "w":
        return "ẁ";
      case "W":
        return "Ẁ";
      case "y":
        return "ỳ";
      case "Y":
        return "Ỳ";
      case "ê":
        return "ề";
      case "Ê":
        return "Ề";
      default:
        return e;
    }
  }
  addCaron(e) {
    switch (e) {
      case "a":
        return "ǎ";
      case "A":
        return "Ǎ";
      case "c":
        return "č";
      case "C":
        return "Č";
      case "d":
        return "ď";
      case "D":
        return "Ď";
      case "e":
        return "ě";
      case "E":
        return "Ě";
      case "g":
        return "ǧ";
      case "G":
        return "Ǧ";
      case "h":
        return "ȟ";
      case "H":
        return "Ȟ";
      case "i":
        return "ǐ";
      case "I":
        return "Ǐ";
      case "j":
        return "ǰ";
      case "k":
        return "ǩ";
      case "K":
        return "Ǩ";
      case "l":
        return "ľ";
      case "L":
        return "Ľ";
      case "n":
        return "ň";
      case "N":
        return "Ň";
      case "o":
        return "ǒ";
      case "O":
        return "Ǒ";
      case "r":
        return "ř";
      case "R":
        return "Ř";
      case "s":
        return "š";
      case "S":
        return "Š";
      case "t":
        return "ť";
      case "T":
        return "Ť";
      case "u":
        return "ǔ";
      case "U":
        return "Ǔ";
      case "z":
        return "ž";
      case "Z":
        return "Ž";
      case "1":
        return "₁";
      case "2":
        return "₂";
      case "3":
        return "₃";
      case "4":
        return "₄";
      case "5":
        return "₅";
      case "6":
        return "₆";
      case "7":
        return "₇";
      case "8":
        return "₈";
      case "9":
        return "₉";
      case "0":
        return "₀";
      default:
        return e;
    }
  }
  addBar(e) {
    switch (e) {
      case "a":
        return "ⱥ";
      case "A":
        return "Ⱥ";
      case "b":
        return "ƀ";
      case "B":
        return "Ƀ";
      case "c":
        return "ȼ";
      case "C":
        return "Ȼ";
      case "d":
        return "đ";
      case "D":
        return "Đ";
      case "e":
        return "ɇ";
      case "E":
        return "Ɇ";
      case "g":
        return "ǥ";
      case "G":
        return "Ǥ";
      case "h":
        return "ħ";
      case "H":
        return "Ħ";
      case "i":
        return "ɨ";
      case "I":
        return "Ɨ";
      case "j":
        return "ɉ";
      case "J":
        return "Ɉ";
      case "l":
        return "ł";
      case "L":
        return "Ł";
      case "o":
        return "ø";
      case "O":
        return "Ø";
      case "p":
        return "ᵽ";
      case "P":
        return "Ᵽ";
      case "r":
        return "ɍ";
      case "R":
        return "Ɍ";
      case "t":
        return "ŧ";
      case "T":
        return "Ŧ";
      case "u":
        return "ʉ";
      case "U":
        return "Ʉ";
      case "y":
        return "ɏ";
      case "Y":
        return "Ɏ";
      case "z":
        return "ƶ";
      case "Z":
        return "Ƶ";
      default:
        return e;
    }
  }
  addBreve(e) {
    switch (e) {
      case "a":
        return "ă";
      case "A":
        return "Ă";
      case "e":
        return "ĕ";
      case "E":
        return "Ĕ";
      case "g":
        return "ğ";
      case "G":
        return "Ğ";
      case "i":
        return "ĭ";
      case "I":
        return "Ĭ";
      case "o":
        return "ŏ";
      case "O":
        return "Ŏ";
      case "u":
        return "ŭ";
      case "U":
        return "Ŭ";
      case "à":
        return "ằ";
      case "À":
        return "Ằ";
      default:
        return e;
    }
  }
  addTilde(e) {
    switch (e) {
      case "a":
        return "ã";
      case "A":
        return "Ã";
      case "e":
        return "ẽ";
      case "E":
        return "Ẽ";
      case "i":
        return "ĩ";
      case "I":
        return "Ĩ";
      case "n":
        return "ñ";
      case "N":
        return "Ñ";
      case "o":
        return "õ";
      case "O":
        return "Õ";
      case "u":
        return "ũ";
      case "U":
        return "Ũ";
      case "v":
        return "ṽ";
      case "V":
        return "Ṽ";
      case "y":
        return "ỹ";
      case "Y":
        return "Ỹ";
      case "ê":
        return "ễ";
      case "Ê":
        return "Ễ";
      default:
        return e;
    }
  }
  addMacron(e) {
    switch (e) {
      case "a":
        return "ā";
      case "A":
        return "Ā";
      case "e":
        return "ē";
      case "E":
        return "Ē";
      case "g":
        return "ḡ";
      case "G":
        return "Ḡ";
      case "i":
        return "ī";
      case "I":
        return "Ī";
      case "o":
        return "ō";
      case "O":
        return "Ō";
      case "u":
        return "ū";
      case "U":
        return "Ū";
      case "y":
        return "ȳ";
      case "Y":
        return "Ȳ";
      case "é":
        return "ḗ";
      case "É":
        return "Ḗ";
      case "è":
        return "ḕ";
      case "È":
        return "Ḕ";
      default:
        return e;
    }
  }
  addCedilla(e) {
    switch (e) {
      case "c":
        return "ç";
      case "C":
        return "Ç";
      case "d":
        return "ḑ";
      case "D":
        return "Ḑ";
      case "e":
        return "ȩ";
      case "E":
        return "Ȩ";
      case "g":
        return "ģ";
      case "G":
        return "Ģ";
      case "h":
        return "ḩ";
      case "H":
        return "Ḩ";
      case "k":
        return "ķ";
      case "K":
        return "Ķ";
      case "l":
        return "ļ";
      case "L":
        return "Ļ";
      case "n":
        return "ņ";
      case "N":
        return "Ņ";
      case "r":
        return "ŗ";
      case "R":
        return "Ŗ";
      case "s":
        return "ş";
      case "S":
        return "Ş";
      case "t":
        return "ţ";
      case "T":
        return "Ţ";
      default:
        return e;
    }
  }
  addOverring(e) {
    switch (e) {
      case "a":
        return "å";
      case "A":
        return "Å";
      case "u":
        return "ů";
      case "U":
        return "Ů";
      case "w":
        return "ẘ";
      case "y":
        return "ẙ";
      default:
        return e;
    }
  }
  toGreek(e) {
    switch (e) {
      case "b":
        return "β";
      case "p":
        return "π";
      case "P":
        return "Π";
      case "d":
        return "δ";
      case "D":
        return "Δ";
      case "l":
        return "λ";
      case "L":
        return "Λ";
      case "j":
        return "θ";
      case "J":
        return "Θ";
      case "z":
        return "ζ";
      case "w":
        return "ω";
      case "W":
        return "Ω";
      case "A":
        return "α";
      case "u":
        return "υ";
      case "U":
        return "Υ";
      case "i":
        return "ι";
      case "e":
        return "ε";
      case "t":
        return "τ";
      case "s":
        return "σ";
      case "S":
        return "Σ";
      case "r":
        return "ρ";
      case "R":
        return "Ρ";
      case "n":
        return "ν";
      case "m":
        return "μ";
      case "y":
        return "ψ";
      case "Y":
        return "Ψ";
      case "x":
        return "ξ";
      case "X":
        return "Ξ";
      case "k":
        return "κ";
      case "q":
        return "χ";
      case "Q":
        return "Χ";
      case "g":
        return "γ";
      case "G":
        return "Γ";
      case "h":
        return "η";
      case "f":
        return "φ";
      case "F":
        return "Φ";
      default:
        return e;
    }
  }
  addIotasub(e) {
    switch (e) {
      case "o":
        return "ǫ";
      case "O":
        return "Ǫ";
      case "a":
        return "ą";
      case "A":
        return "Ą";
      case "u":
        return "ų";
      case "U":
        return "Ų";
      case "i":
        return "į";
      case "I":
        return "Į";
      case "e":
        return "ę";
      case "E":
        return "Ę";
      default:
        return e;
    }
  }
}
module.exports = { Keyboard };
