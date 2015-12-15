(ns rtcviewr.core
  (:require [reagent.core :as r]
            [goog.dom :as dom]
            [rtc]
            [rtcviewr.components.main :refer [main]]))

(defn init!
  []
  (r/render-component [main]
    (.-body js/document)))

(init!)