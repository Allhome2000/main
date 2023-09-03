class FuzzyFinder {
  constructor() {
    if (
      document.getElementById("fuzzyFinder") ||
      document.getElementById("settingsEditor")
    )
      return !1;
    window.keyboard.detach(),
      (this.disp = new Modal(
        {
          type: "custom",
          title: "Fuzzy cwd file search",
          html: '<input type="search" id="fuzzyFinder" placeholder="Search file in cwd..." />\n                <ul id="fuzzyFinder-results">\n                    <li class="fuzzyFinderMatchSelected"></li>\n                    <li></li>\n                    <li></li>\n                    <li></li>\n                    <li></li>\n                </ul>',
          buttons: [
            { label: "Select", action: "window.activeFuzzyFinder.submit()" },
          ],
        },
        () => {
          delete window.activeFuzzyFinder,
            window.keyboard.attach(),
            window.term[window.currentTerm].term.focus();
        }
      )),
      (this.input = document.getElementById("fuzzyFinder")),
      (this.results = document.getElementById("fuzzyFinder-results")),
      this.input.addEventListener("input", (e) => {
        (e.inputType && e.inputType.startsWith("delete")) ||
        (e.detail && e.detail.startsWith("delete"))
          ? ((this.input.value = ""), this.search(""))
          : this.search(this.input.value);
      }),
      this.input.addEventListener("change", (e) => {
        "enter" === e.detail && this.submit();
      }),
      this.input.addEventListener("keydown", (e) => {
        let t, i, n, r;
        switch (e.key) {
          case "Enter":
            this.submit(), e.preventDefault();
            break;
          case "ArrowDown":
            (t = document.querySelector("li.fuzzyFinderMatchSelected")),
              (i = Number(t.id.substr(17))),
              (n = document.getElementById(`fuzzyFinderMatch-${i + 1}`)
                ? i + 1
                : 0),
              (r = document.getElementById(`fuzzyFinderMatch-${n}`)),
              t.removeAttribute("class"),
              r.setAttribute("class", "fuzzyFinderMatchSelected"),
              e.preventDefault();
            break;
          case "ArrowUp":
            (t = document.querySelector("li.fuzzyFinderMatchSelected")),
              (i = Number(t.id.substr(17))),
              (n = document.getElementById("fuzzyFinderMatch-" + (i - 1))
                ? i - 1
                : 0),
              (r = document.getElementById(`fuzzyFinderMatch-${n}`)),
              t.removeAttribute("class"),
              r.setAttribute("class", "fuzzyFinderMatchSelected"),
              e.preventDefault();
            break;
          default:
        }
      }),
      this.search(""),
      this.input.focus();
  }
  search(e) {
    let t = window.fsDisp.cwd,
      i = 0,
      n = t.filter(
        (t) =>
          !(i >= 5 || "showDisks" === t.type || "up" === t.type) &&
          (t.name.toLowerCase().includes(e.toLowerCase()) ? (i++, !0) : void 0)
      );
    n.sort((t, i) =>
      t.name.toLowerCase().startsWith(e.toLowerCase()) &&
      !i.name.toLowerCase().startsWith(e.toLowerCase())
        ? -1
        : !t.name.toLowerCase().startsWith(e.toLowerCase()) &&
          i.name.toLowerCase().startsWith(e.toLowerCase())
        ? 1
        : 0
    ),
      0 === n.length &&
        (this.results.innerHTML =
          '<li class="fuzzyFinderMatchSelected">No results</li>\n                 <li></li>\n                  <li></li>\n                  <li></li>\n                  <li></li>');
    let r = "";
    if (
      (n.forEach((e, t) => {
        r += `<li id="fuzzyFinderMatch-${t}" class="${
          0 === t ? "fuzzyFinderMatchSelected" : ""
        }" onclick="document.querySelector('li.fuzzyFinderMatchSelected').removeAttribute('class');document.getElementById('fuzzyFinderMatch-${t}').setAttribute('class', 'fuzzyFinderMatchSelected')">${
          e.name
        }</li>`;
      }),
      5 !== n.length)
    )
      for (let e = n.length; e < 5; e++) r += "<li></li>";
    this.results.innerHTML = r;
  }
  submit() {
    let e = document.querySelector("li.fuzzyFinderMatchSelected").innerText;
    if ("No results" === e || e.length <= 0) return void this.disp.close();
    let t = path.resolve(window.fsDisp.dirpath, e);
    window.term[window.currentTerm].write(`'${t}'`), this.disp.close();
  }
}
module.exports = { FuzzyFinder };
