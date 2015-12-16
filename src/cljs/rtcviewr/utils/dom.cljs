(ns rtcviewr.utils.dom)

(defn isElementDocumentActive?
  [el]
  (= el js/document.activeElement))