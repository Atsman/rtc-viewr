(ns rtcviewr.core
  (:require [reagent.core :as r]
            [rtc]
            [rtcviewr.components.main :refer [main]]
            [rtcviewr.components.toolbarmanager :refer [toolbarManager]]
            [rtcviewr.api.ws]))

(defn qs [selector]
  (.querySelector js/document selector))

(defn init!
  []
  (r/render-component [main]
    (qs ".main")))

(init!)

(toolbarManager (qs ".header") (qs ".controls"))

