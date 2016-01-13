(ns rtcviewr.utils.dom)

(defn isElementDocumentActive?
  [el]
  (= el js/document.activeElement))

(defn qs [selector]
  (.querySelector js/document selector))