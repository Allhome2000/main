class DocReader {
  constructor(e) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "./node_modules/pdfjs-dist/build/pdf.worker.js";
    const t = "modal_" + e.modalId,
      n = e.path,
      o = 1,
      d = document.getElementById(t).querySelector(".pdf_canvas"),
      r = d.getContext("2d"),
      s = pdfjsLib.getDocument(n);
    let i = null,
      u = 1,
      c = !1,
      l = null,
      a = 100;
    (this.renderPage = (e) => {
      (c = !0),
        s.promise.then(function (t) {
          i.getPage(e).then(function (e) {
            const t = e.getViewport({ scale: 1 });
            (d.height = t.height), (d.width = t.width);
            const n = { canvasContext: r, viewport: t },
              o = undefined;
            e.render(n).promise.then(function () {
              (c = !1), null !== l && (renderPage(l), (l = null));
            });
          });
        }),
        (document.getElementById(t).querySelector(".page_num").textContent = e);
    }),
      (this.queueRenderPage = (e) => {
        c ? (l = e) : this.renderPage(e);
      }),
      (this.onPrevPage = () => {
        u <= 1 || (u--, this.queueRenderPage(u));
      }),
      (this.onNextPage = () => {
        u >= i.numPages || (u++, this.queueRenderPage(u));
      }),
      (this.zoomIn = () => {
        a >= 200 || ((a += 10), (d.style.zoom = a + "%"));
      }),
      (this.zoomOut = () => {
        a <= 50 || ((a -= 10), (d.style.zoom = a + "%"));
      }),
      document
        .getElementById(t)
        .querySelector(".previous_page")
        .addEventListener("click", this.onPrevPage),
      document
        .getElementById(t)
        .querySelector(".next_page")
        .addEventListener("click", this.onNextPage),
      document
        .getElementById(t)
        .querySelector(".zoom_in")
        .addEventListener("click", this.zoomIn),
      document
        .getElementById(t)
        .querySelector(".zoom_out")
        .addEventListener("click", this.zoomOut),
      pdfjsLib.getDocument(n).promise.then((e) => {
        (i = e),
          (document.getElementById(t).querySelector(".page_count").textContent =
            i.numPages),
          this.renderPage(u);
      });
  }
}
module.exports = { DocReader };
