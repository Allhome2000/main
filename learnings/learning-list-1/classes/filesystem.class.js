class FilesystemDisplay {
  constructor(e) {
    if (!e.parentId) throw "Missing options";
    const t = require("fs"),
      s = require("path");
    (this.cwd = []),
      (this.cwd_path = null),
      (this.iconcolor = `rgb(${window.theme.r}, ${window.theme.g}, ${window.theme.b})`),
      (this._formatBytes = (e, t) => {
        if (0 == e) return "0 Bytes";
        var s = 1024,
          i = t || 2,
          n = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          a = Math.floor(Math.log(e) / Math.log(s));
        return parseFloat((e / Math.pow(s, a)).toFixed(i)) + " " + n[a];
      }),
      (this.fileIconsMatcher = require("./assets/misc/file-icons-match.js")),
      (this.icons = require("./assets/icons/file-icons.json")),
      (this.edexIcons = {
        theme: {
          width: 24,
          height: 24,
          svg: '<path d="M 17.9994,3.99805L 17.9994,2.99805C 17.9994,2.44604 17.5514,1.99805 16.9994,1.99805L 4.9994,1.99805C 4.4474,1.99805 3.9994,2.44604 3.9994,2.99805L 3.9994,6.99805C 3.9994,7.55005 4.4474,7.99805 4.9994,7.99805L 16.9994,7.99805C 17.5514,7.99805 17.9994,7.55005 17.9994,6.99805L 17.9994,5.99805L 18.9994,5.99805L 18.9994,9.99805L 8.9994,9.99805L 8.9994,20.998C 8.9994,21.55 9.4474,21.998 9.9994,21.998L 11.9994,21.998C 12.5514,21.998 12.9994,21.55 12.9994,20.998L 12.9994,11.998L 20.9994,11.998L 20.9994,3.99805L 17.9994,3.99805 Z"/>',
        },
        themesDir: {
          width: 24,
          height: 24,
          svg: `<path d="m9.9994 3.9981h-6c-1.105 0-1.99 0.896-1.99 2l-0.01 12c0 1.104 0.895 2 2 2h16c1.104 0 2-0.896 2-2v-9.9999c0-1.104-0.896-2-2-2h-8l-1.9996-2z" stroke-width=".2"/><path stroke-linejoin="round" d="m18.8 9.3628v-0.43111c0-0.23797-0.19314-0.43111-0.43111-0.43111h-5.173c-0.23797 0-0.43111 0.19313-0.43111 0.43111v1.7244c0 0.23797 0.19314 0.43111 0.43111 0.43111h5.1733c0.23797 0 0.43111-0.19314 0.43111-0.43111v-0.43111h0.43111v1.7244h-4.3111v4.7422c0 0.23797 0.19314 0.43111 0.43111 0.43111h0.86221c0.23797 0 0.43111-0.19314 0.43111-0.43111v-3.879h3.449v-3.4492z" stroke-width=".086221" fill="${window.theme.colors.light_black}"/>`,
        },
        kblayout: {
          width: 24,
          height: 24,
          svg: '<path d="M 18.9994,9.99807L 16.9994,9.99807L 16.9994,7.99807L 18.9994,7.99807M 18.9994,12.9981L 16.9994,12.9981L 16.9994,10.9981L 18.9994,10.9981M 15.9994,9.99807L 13.9994,9.99807L 13.9994,7.99807L 15.9994,7.99807M 15.9994,12.9981L 13.9994,12.9981L 13.9994,10.9981L 15.9994,10.9981M 15.9994,16.9981L 7.99941,16.9981L 7.99941,14.9981L 15.9994,14.9981M 6.99941,9.99807L 4.99941,9.99807L 4.99941,7.99807L 6.99941,7.99807M 6.99941,12.9981L 4.99941,12.9981L 4.99941,10.9981L 6.99941,10.9981M 7.99941,10.9981L 9.99941,10.9981L 9.99941,12.9981L 7.99941,12.9981M 7.99941,7.99807L 9.99941,7.99807L 9.99941,9.99807L 7.99941,9.99807M 10.9994,10.9981L 12.9994,10.9981L 12.9994,12.9981L 10.9994,12.9981M 10.9994,7.99807L 12.9994,7.99807L 12.9994,9.99807L 10.9994,9.99807M 19.9994,4.99807L 3.99941,4.99807C 2.89441,4.99807 2.0094,5.89406 2.0094,6.99807L 1.99941,16.9981C 1.99941,18.1021 2.89441,18.9981 3.99941,18.9981L 19.9994,18.9981C 21.1034,18.9981 21.9994,18.1021 21.9994,16.9981L 21.9994,6.99807C 21.9994,5.89406 21.1034,4.99807 19.9994,4.99807 Z"/>',
        },
        kblayoutsDir: {
          width: 24,
          height: 24,
          svg: `<path d="m9.9994 3.9981h-6c-1.105 0-1.99 0.896-1.99 2l-0.01 12c0 1.104 0.895 2 2 2h16c1.104 0 2-0.896 2-2v-9.9999c0-1.104-0.896-2-2-2h-8l-1.9996-2z" stroke-width=".2"/><path stroke-linejoin="round" d="m17.48 11.949h-1.14v-1.14h1.14m0 2.8499h-1.14v-1.14h1.14m-1.7099-0.56999h-1.14v-1.14h1.14m0 2.8499h-1.14v-1.14h1.14m0 3.4199h-4.56v-1.14h4.56m-5.13-2.85h-1.1399v-1.14h1.14m0 2.8499h-1.1399v-1.14h1.14m0.56998 0h1.14v1.14h-1.14m0-2.8499h1.14v1.14h-1.14m1.7099 0.56999h1.14v1.14h-1.14m0-2.8499h1.14v1.14h-1.14m5.13-2.8494h-9.1199c-0.62982 0-1.1343 0.51069-1.1343 1.14l-0.0057 5.6998c0 0.62925 0.51013 1.14 1.14 1.14h9.1196c0.62925 0 1.14-0.5107 1.14-1.14v-5.6998c0-0.62926-0.5107-1.14-1.14-1.14z" stroke-width="0.114" fill="${window.theme.colors.light_black}"/>`,
        },
        settings: {
          width: 24,
          height: 24,
          svg: '<path d="M 11.9994,15.498C 10.0664,15.498 8.49939,13.931 8.49939,11.998C 8.49939,10.0651 10.0664,8.49805 11.9994,8.49805C 13.9324,8.49805 15.4994,10.0651 15.4994,11.998C 15.4994,13.931 13.9324,15.498 11.9994,15.498 Z M 19.4284,12.9741C 19.4704,12.6531 19.4984,12.329 19.4984,11.998C 19.4984,11.6671 19.4704,11.343 19.4284,11.022L 21.5414,9.36804C 21.7294,9.21606 21.7844,8.94604 21.6594,8.73004L 19.6594,5.26605C 19.5354,5.05005 19.2734,4.96204 19.0474,5.04907L 16.5584,6.05206C 16.0424,5.65607 15.4774,5.32104 14.8684,5.06903L 14.4934,2.41907C 14.4554,2.18103 14.2484,1.99805 13.9994,1.99805L 9.99939,1.99805C 9.74939,1.99805 9.5434,2.18103 9.5054,2.41907L 9.1304,5.06805C 8.52039,5.32104 7.95538,5.65607 7.43939,6.05206L 4.95139,5.04907C 4.7254,4.96204 4.46338,5.05005 4.33939,5.26605L 2.33939,8.73004C 2.21439,8.94604 2.26938,9.21606 2.4574,9.36804L 4.5694,11.022C 4.5274,11.342 4.49939,11.6671 4.49939,11.998C 4.49939,12.329 4.5274,12.6541 4.5694,12.9741L 2.4574,14.6271C 2.26938,14.78 2.21439,15.05 2.33939,15.2661L 4.33939,18.73C 4.46338,18.946 4.7254,19.0341 4.95139,18.947L 7.4404,17.944C 7.95639,18.34 8.52139,18.675 9.1304,18.9271L 9.5054,21.577C 9.5434,21.8151 9.74939,21.998 9.99939,21.998L 13.9994,21.998C 14.2484,21.998 14.4554,21.8151 14.4934,21.577L 14.8684,18.9271C 15.4764,18.6741 16.0414,18.34 16.5574,17.9431L 19.0474,18.947C 19.2734,19.0341 19.5354,18.946 19.6594,18.73L 21.6594,15.2661C 21.7844,15.05 21.7294,14.78 21.5414,14.6271L 19.4284,12.9741 Z"/>',
        },
      });
    const i = document.getElementById(e.parentId);
    (i.innerHTML =
      '\n            <h3 class="title"><p>FILESYSTEM</p><p id="fs_disp_title_dir"></p></h3>\n            <div id="fs_disp_container">\n            </div>\n            <div id="fs_space_bar">\n                <h1>EXIT DISPLAY</h1>\n                <h3>Calculating available space...</h3><progress value="100" max="100"></progress>\n            </div>'),
      (this.filesContainer = document.getElementById("fs_disp_container")),
      (this.space_bar = {
        text: document.querySelector("#fs_space_bar > h3"),
        bar: document.querySelector("#fs_space_bar > progress"),
      }),
      (this.fsBlock = {}),
      (this.dirpath = ""),
      (this.failed = !1),
      (this._noTracking = !1),
      (this._runNextTick = !1),
      (this._reading = !1),
      (this._timer = setInterval(() => {
        !0 === this._runNextTick &&
          ((this._runNextTick = !1), this.readFS(this.dirpath));
      }, 1e3)),
      (this._asyncFSwrapper = new Proxy(t, {
        get: function (e, t) {
          if (t in e)
            return function (...s) {
              return new Promise((i, n) => {
                e[t](...s, (e, t) => {
                  null != e && n(e),
                    void 0 !== t && i(t),
                    void 0 === t && void 0 === e && i();
                });
              });
            };
        },
        set: function () {
          return !1;
        },
      })),
      (this.setFailedState = () => {
        (this.failed = !0),
          (i.innerHTML =
            '\n            <h3 class="title"><p>FILESYSTEM</p><p id="fs_disp_title_dir">EXECUTION FAILED</p></h3>\n            <h2 id="fs_disp_error">CANNOT ACCESS CURRENT WORKING DIRECTORY</h2>');
      }),
      (this.followTab = () => {
        if (this._noTracking) return !1;
        let e = window.currentTerm;
        window.term[e].oncwdchange = (t) => {
          if (this._noTracking) return !1;
          t &&
            t !== this.cwd_path &&
            window.currentTerm === e &&
            ((this.cwd_path = t),
            this._fsWatcher && this._fsWatcher.close(),
            t.startsWith("FALLBACK |-- ")
              ? (this.readFS(t.slice(13)), (this._noTracking = !0))
              : (this.readFS(t), this.watchFS(t)));
        };
      }),
      this.followTab(),
      (this.watchFS = (e) => {
        this._fsWatcher && this._fsWatcher.close(),
          (this._fsWatcher = t.watch(e, (e, t) => {
            "change" != e && (this._runNextTick = !0);
          }));
      }),
      (this.toggleHidedotfiles = () => {
        window.settings.hideDotfiles
          ? (i.classList.remove("hideDotfiles"),
            (window.settings.hideDotfiles = !1))
          : (i.classList.add("hideDotfiles"),
            (window.settings.hideDotfiles = !0));
      }),
      (this.toggleListview = () => {
        window.settings.fsListView
          ? (i.classList.remove("list-view"), (window.settings.fsListView = !1))
          : (i.classList.add("list-view"), (window.settings.fsListView = !0));
      }),
      (this.readFS = async (e) => {
        if (!0 === this.failed || this._reading) return !1;
        (this._reading = !0),
          (document.getElementById("fs_disp_title_dir").innerText =
            this.dirpath),
          this.filesContainer.setAttribute("class", ""),
          (this.filesContainer.innerHTML = ""),
          this._noTracking &&
            (document.querySelector(
              "section#filesystem > h3.title > p:first-of-type"
            ).innerText =
              "FILESYSTEM - TRACKING FAILED, RUNNING DETACHED FROM TTY"),
          "win32" === process.platform && e.endsWith(":") && (e += "\\");
        let t = e,
          i = await this._asyncFSwrapper.readdir(t).catch((e) => {
            console.warn(e),
              !0 === this._noTracking && this.dirpath
                ? (this.setFailedState(),
                  setTimeout(() => {
                    this.readFS(this.dirpath);
                  }, 1e3))
                : this.setFailedState();
          });
        if (
          (this.reCalculateDiskUsage(t),
          (this.cwd = []),
          await new Promise((e, n) => {
            0 === i.length && e(),
              i.forEach(async (a, o) => {
                let r = await this._asyncFSwrapper
                    .lstat(s.join(t, a))
                    .catch((e) => {
                      e.message.includes("EPERM") ||
                        e.message.includes("EBUSY") ||
                        n();
                    }),
                  d = {
                    name: window._escapeHtml(a),
                    path: s.resolve(t, a),
                    type: "other",
                    category: "other",
                    hidden: !1,
                  };
                void 0 !== r
                  ? ((d.lastAccessed = r.mtime.getTime()),
                    r.isDirectory() && ((d.category = "dir"), (d.type = "dir")),
                    "dir" === d.category &&
                      t === settingsDir &&
                      "themes" === a &&
                      (d.type = "edex-themesDir"),
                    "dir" === d.category &&
                      t === settingsDir &&
                      "keyboards" === a &&
                      (d.type = "edex-kblayoutsDir"),
                    r.isSymbolicLink() &&
                      ((d.category = "symlink"), (d.type = "symlink")),
                    r.isFile() &&
                      ((d.category = "file"),
                      (d.type = "file"),
                      (d.size = r.size)))
                  : ((d.type = "system"), (d.hidden = !0)),
                  "file" === d.category &&
                    t === themesDir &&
                    a.endsWith(".json") &&
                    (d.type = "edex-theme"),
                  "file" === d.category &&
                    t === keyboardsDir &&
                    a.endsWith(".json") &&
                    (d.type = "edex-kblayout"),
                  "file" === d.category &&
                    t === settingsDir &&
                    "settings.json" === a &&
                    (d.type = "edex-settings"),
                  "file" === d.category &&
                    t === settingsDir &&
                    "shortcuts.json" === a &&
                    (d.type = "edex-shortcuts"),
                  a.startsWith(".") && (d.hidden = !0),
                  this.cwd.push(d),
                  o === i.length - 1 && e();
              });
          }).catch(() => {
            this.setFailedState();
          }),
          this.failed)
        )
          return !1;
        let n = { dir: 0, symlink: 1, file: 2, other: 3 };
        this.cwd.sort(
          (e, t) =>
            n[e.category] - n[t.category] || e.name.localeCompare(t.name)
        ),
          this.cwd.splice(0, 0, { name: "Show disks", type: "showDisks" }),
          "/" !== t &&
            !1 === /^[A-Z]:\\$/i.test(t) &&
            this.cwd.splice(1, 0, { name: "Go up", type: "up" }),
          (this.dirpath = t),
          this.render(this.cwd),
          (this._reading = !1);
      }),
      (this.readDevices = async () => {
        if (!0 === this.failed) return !1;
        let e = await window.si.blockDevices(),
          s = [];
        e.forEach((e) => {
          if (t.existsSync(e.mount)) {
            let t = "rom" === e.type ? "rom" : "disk";
            e.removable && "rom" !== e.type && (t = "usb"),
              s.push({
                name:
                  "" !== e.label
                    ? `${e.label} (${e.name})`
                    : `${e.mount} (${e.name})`,
                type: t,
                path: e.mount,
              });
          }
        }),
          this.render(s, !0);
      }),
      (this.render = async (e, t) => {
        let s = JSON.parse(JSON.stringify(e));
        if (!0 === this.failed) return !1;
        t
          ? ((document.getElementById("fs_disp_title_dir").innerText =
              "Showing available block devices"),
            this.filesContainer.setAttribute("class", "disks"))
          : ((document.getElementById("fs_disp_title_dir").innerText =
              this.dirpath),
            this.filesContainer.setAttribute("class", "")),
          this._noTracking &&
            (document.querySelector(
              "section#filesystem > h3.title > p:first-of-type"
            ).innerText =
              "FILESYSTEM - TRACKING FAILED, RUNNING DETACHED FROM TTY");
        let i = "";
        s.forEach((e, t) => {
          let s = e.hidden ? " hidden" : "",
            n =
              `if (window.keyboard.container.dataset.isCtrlOn == "true") {\n                                electron.shell.openPath(fsDisp.cwd[${t}].path);\n                                electronWin.minimize();\n                            } else if (window.keyboard.container.dataset.isShiftOn == "true") {\n                                window.term[window.currentTerm].write("\\""+fsDisp.cwd[${t}].path+"\\"");\n                            } else {\n                          `.replace(
                /\n+ */g,
                ""
              ),
            a = "}",
            o;
          (o = this._noTracking
            ? "dir" === e.type || e.type.endsWith("Dir")
              ? `window.fsDisp.readFS(fsDisp.cwd[${t}].path)`
              : "up" === e.type
              ? 'window.fsDisp.readFS(path.resolve(window.fsDisp.dirpath, ".."))'
              : "disk" === e.type || "rom" === e.type || "usb" === e.type
              ? `window.fsDisp.readFS("${e.path.replace(/\\/g, "")}")`
              : `window.term[window.currentTerm].write("\\""+fsDisp.cwd[${t}].path+"\\"")`
            : "dir" === e.type || e.type.endsWith("Dir")
            ? `window.term[window.currentTerm].writelr("cd \\""+fsDisp.cwd[${t}].name+"\\"")`
            : "up" === e.type
            ? 'window.term[window.currentTerm].writelr("cd ..")'
            : "disk" === e.type || "rom" === e.type || "usb" === e.type
            ? "win32" === process.platform
              ? `window.term[window.currentTerm].writelr("${e.path.replace(
                  /\\/g,
                  ""
                )}")`
              : `window.term[window.currentTerm].writelr("cd \\"${e.path.replace(
                  /\\/g,
                  ""
                )}\\"")`
            : `window.term[window.currentTerm].write("\\""+fsDisp.cwd[${t}].path+"\\"")`),
            "file" === e.type && (o = `window.fsDisp.openFile(${t})`),
            "system" === e.type && (o = ""),
            "showDisks" === e.type &&
              ((o = "window.fsDisp.readDevices()"), (n = ""), (a = "")),
            "up" === e.type && ((n = ""), (a = "")),
            "edex-theme" === e.type &&
              (o = `window.themeChanger("${e.name.slice(0, -5)}")`),
            "edex-kblayout" === e.type &&
              (o = `window.remakeKeyboard("${e.name.slice(0, -5)}")`),
            "edex-settings" === e.type && (o = "window.openSettings()"),
            "edex-shortcuts" === e.type && (o = "window.openShortcutsHelp()");
          let r = "",
            d = "";
          switch (e.type) {
            case "showDisks":
              (r = this.icons.showDisks),
                (d = "--"),
                (e.category = "showDisks");
              break;
            case "up":
              (r = this.icons.up), (d = "--"), (e.category = "up");
              break;
            case "symlink":
              r = this.icons.symlink;
              break;
            case "disk":
              r = this.icons.disk;
              break;
            case "rom":
              r = this.icons.rom;
              break;
            case "usb":
              r = this.icons.usb;
              break;
            case "edex-theme":
              (r = this.edexIcons.theme), (d = "eDEX-UI theme");
              break;
            case "edex-kblayout":
              (r = this.edexIcons.kblayout), (d = "eDEX-UI keyboard layout");
              break;
            case "edex-settings":
            case "edex-shortcuts":
              (r = this.edexIcons.settings), (d = "eDEX-UI config file");
              break;
            case "system":
              r = this.edexIcons.settings;
              break;
            case "edex-themesDir":
              (r = this.edexIcons.themesDir), (d = "eDEX-UI themes folder");
              break;
            case "edex-kblayoutsDir":
              (r = this.edexIcons.kblayoutsDir),
                (d = "eDEX-UI keyboards folder");
              break;
            default:
              let t = this.fileIconsMatcher(e.name);
              (r = this.icons[t]),
                void 0 === r
                  ? ("file" === e.type && (r = this.icons.file),
                    "dir" === e.type && ((r = this.icons.dir), (d = "folder")),
                    void 0 === r && (r = this.icons.other))
                  : (d =
                      "dir" !== e.category
                        ? t.replace("icon-", "")
                        : "special folder");
              break;
          }
          "" === d && (d = e.type),
            (e.type = d),
            ("video" !== e.type && "audio" !== e.type && "image" !== e.type) ||
              ((this.cwd[t].type = e.type),
              (o = `window.fsDisp.openMedia(${t})`)),
            "number" == typeof e.size
              ? (e.size = this._formatBytes(e.size))
              : (e.size = "--"),
            "number" == typeof e.lastAccessed
              ? (e.lastAccessed = new Date(e.lastAccessed).toLocaleString())
              : (e.lastAccessed = "--"),
            (i += `<div class="fs_disp_${e.type}${s} animationWait" onclick='${
              n + o + a
            }'>\n                                <svg viewBox="0 0 ${r.width} ${
              r.height
            }" fill="${this.iconcolor}">\n                                    ${
              r.svg
            }\n                                </svg>\n                                <h3>${
              e.name
            }</h3>\n                                <h4>${d}</h4>\n                                <h4>${
              e.size
            }</h4>\n                                <h4>${
              e.lastAccessed
            }</h4>\n                            </div>`);
        }),
          (this.filesContainer.innerHTML = i),
          this.filesContainer.getAttribute("class").endsWith("disks")
            ? document
                .getElementById("fs_space_bar")
                .setAttribute(
                  "onclick",
                  "window.fsDisp.render(window.fsDisp.cwd)"
                )
            : document
                .getElementById("fs_space_bar")
                .setAttribute("onclick", "");
        let n = 0;
        for (; this.filesContainer.childNodes[n]; ) {
          let e = this.filesContainer.childNodes[n];
          e.setAttribute("class", e.className.replace(" animationWait", "")),
            (!0 === window.settings.hideDotfiles &&
              -1 !== e.className.indexOf("hidden")) ||
              (window.audioManager.folder.play(), await _delay(30)),
            n++;
        }
      }),
      (this.reCalculateDiskUsage = async (e) => {
        (this.fsBlock = null),
          (this.space_bar.text.innerHTML = "Calculating available space..."),
          this.space_bar.bar.removeAttribute("value"),
          window.si
            .fsSize()
            .catch(() => {
              (this.space_bar.text.innerHTML =
                "Could not calculate mountpoint usage."),
                (this.space_bar.bar.value = 100);
            })
            .then((t) => {
              t.forEach((t) => {
                e.startsWith(t.mount) && (this.fsBlock = t);
              }),
                this.renderDiskUsage(this.fsBlock);
            });
      }),
      (this.renderDiskUsage = async (e) => {
        if (
          "" !==
            document.getElementById("fs_space_bar").getAttribute("onclick") ||
          null === e
        )
          return;
        let t = "win32" === process.platform ? "\\" : "/",
          s =
            e.mount.length < 18 ? e.mount : "..." + t + e.mount.split(t).pop();
        if (isNaN(e.use))
          if (isNaN((e.size / e.used) * 100))
            (this.space_bar.text.innerHTML =
              "Could not calculate mountpoint usage."),
              (this.space_bar.bar.value = 100);
          else {
            let t = Math.round((e.size / e.used) * 100);
            (this.space_bar.text.innerHTML = `Mount <strong>${s}</strong> used <strong>${t}%</strong>`),
              (this.space_bar.bar.value = t);
          }
        else
          (this.space_bar.text.innerHTML = `Mount <strong>${s}</strong> used <strong>${Math.round(
            e.use
          )}%</strong>`),
            (this.space_bar.bar.value = Math.round(e.use));
      }),
      0 === window.performance.navigation.type &&
        this.readFS(window.term[window.currentTerm].cwd || window.settings.cwd),
      (this.openFile = (e, s, i) => {
        let n;
        "number" == typeof e && ((n = this.cwd[e]), (e = n.name));
        let a = require("mime-types");
        n.path = n.path.replace(/\\/g, "/");
        let o = a.lookup(e.split(".")[e.split(".").length - 1]);
        switch (o) {
          case "application/pdf":
            let s = `<div>\n                        <div class="pdf_options">\n                            <button class="zoom_in">\n                                <svg viewBox="0 0 ${this.icons["zoom-in"].width} ${this.icons["zoom-in"].height}" fill="${this.iconcolor}">\n                                    ${this.icons["zoom-in"].svg}\n                                </svg>\n                            </button>\n                            <button class="zoom_out">\n                                <svg viewBox="0 0 ${this.icons["zoom-out"].width} ${this.icons["zoom-out"].height}" fill="${this.iconcolor}">\n                                    ${this.icons["zoom-out"].svg}\n                                </svg>\n                            </button>\n                            <button class="previous_page">\n                                <svg viewBox="0 0 ${this.icons.backwards.width} ${this.icons.backwards.height}" fill="${this.iconcolor}">\n                                    ${this.icons.backwards.svg}\n                                </svg>\n                            </button>\n                            <span>Page: <span class="page_num"/></span><span>/</span> <span class="page_count"></span></span>\n                            <button class="next_page">\n                                <svg viewBox="0 0 ${this.icons.forwards.width} ${this.icons.forwards.height}" fill="${this.iconcolor}">\n                                    ${this.icons.forwards.svg}\n                                </svg>\n                            </button>\n                        </div>\n                        <div class="pdf_container fsDisp_mediaDisp">\n                            <canvas class="pdf_canvas" />\n                        </div>\n                    </div>`;
            const i = new Modal({
              type: "custom",
              title: _escapeHtml(e),
              html: s,
            });
            new DocReader({ modalId: i.id, path: n.path });
            break;
          default:
            if ("UTF-8" === a.charset(o)) {
              t.readFile(n.path, "utf-8", (t, s) => {
                t &&
                  (new Modal({
                    type: "info",
                    title: "Failed to load file: " + n.path,
                    html: t,
                  }),
                  console.log(t)),
                  window.keyboard.detach(),
                  new Modal(
                    {
                      type: "custom",
                      title: _escapeHtml(e),
                      html: `<textarea id="fileEdit" rows="40" cols="150" spellcheck="false">${s}</textarea><p id="fedit-status"></p>`,
                      buttons: [
                        {
                          label: "Save to Disk",
                          action: `window.writeFile('${n.path}')`,
                        },
                      ],
                    },
                    () => {
                      window.keyboard.attach(),
                        window.term[window.currentTerm].term.focus();
                    }
                  );
              });
              break;
            }
        }
      }),
      (this.openMedia = (e, t, s) => {
        let i, n;
        switch (
          ("number" == typeof e && ((i = this.cwd[e]), (e = i.name)),
          (i.path = i.path.replace(/\\/g, "/")),
          s || i.type)
        ) {
          case "image":
            n = `<img class="fsDisp_mediaDisp" src="${window._encodePathURI(
              t || i.path
            )}" ondragstart="return false;">`;
            break;
          case "audio":
            n = `<div>\n                                <div class="media_container" data-fullscreen="false">\n                                    <audio class="media fsDisp_mediaDisp" preload="auto">\n                                        <source src="${window._encodePathURI(
              t || i.path
            )}">\n                                        Unsupported audio format!\n                                    </audio>\n                                    <div class="media_controls" data-state="hidden">\n                                        <div class="playpause media_button" data-state="play">\n                                            <svg viewBox="0 0 ${
              this.icons.play.width
            } ${this.icons.play.height}" fill="${
              this.iconcolor
            }">\n                                                ${
              this.icons.play.svg
            }\n                                            </svg>\n                                        </div>\n                                        <div class="progress_container">\n                                            <div class="progress">\n                                                <span class="progress_bar"></span>\n                                            </div>\n                                        </div>\n                                        <div class="media_time">00:00:00</div>\n                                        <div class="volume_icon">\n                                            <svg viewBox="0 0 ${
              this.icons.volume.width
            } ${this.icons.volume.height}" fill="${
              this.iconcolor
            }">\n                                                ${
              this.icons.volume.svg
            }\n                                            </svg>\n                                        </div>\n                                        <div class="volume">\n                                            <div class="volume_bkg"></div>\n                                            <div class="volume_bar"></div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>`;
            break;
          case "video":
            n = `<div>\n                                <div class="media_container" data-fullscreen="false">\n                                    <video class="media fsDisp_mediaDisp" preload="auto">\n                                        <source src="${window._encodePathURI(
              t || i.path
            )}">\n                                        Unsupported video format!\n                                    </video>\n                                    <div class="media_controls" data-state="hidden">\n                                        <div class="playpause media_button" data-state="play">\n                                            <svg viewBox="0 0 ${
              this.icons.play.width
            } ${this.icons.play.height}" fill="${
              this.iconcolor
            }">\n                                                ${
              this.icons.play.svg
            }\n                                            </svg>\n                                        </div>\n                                        <div class="progress_container">\n                                            <div class="progress">\n                                                <span class="progress_bar"></span>\n                                            </div>\n                                        </div>\n                                        <div class="media_time">00:00:00</div>\n                                        <div class="volume_icon">\n                                            <svg viewBox="0 0 ${
              this.icons.volume.width
            } ${this.icons.volume.height}" fill="${
              this.iconcolor
            }">\n                                                ${
              this.icons.volume.svg
            }\n                                            </svg>\n                                        </div>\n                                        <div class="volume">\n                                            <div class="volume_bkg"></div>\n                                            <div class="volume_bar"></div>\n                                        </div>\n                                        <div class="fs media_button" data-state="go-fullscreen">\n                                            <svg viewBox="0 0 ${
              this.icons.fullscreen.width
            } ${this.icons.fullscreen.height}" fill="${
              this.iconcolor
            }">\n                                                ${
              this.icons.fullscreen.svg
            }\n                                            </svg>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>`;
            break;
          default:
            throw new Error(
              "fsDisp media displayer: unknown type " + (s || i.type)
            );
        }
        const a = new Modal({ type: "custom", title: _escapeHtml(e), html: n });
        ("audio" !== i.type && "video" !== i.type) ||
          new MediaPlayer({ modalId: a.id, path: i.path, type: i.type });
      });
  }
}
module.exports = { FilesystemDisplay };
