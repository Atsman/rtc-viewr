(ns rtcviewr.core
  (:require [reagent.core :as r]
            [rtc]
            [rtcviewr.components.main :refer [main]]
            [rtcviewr.utils.dom :refer [qs]]))

(defn init! []
  (r/render-component [main]
    (qs ".main")))

(init!)