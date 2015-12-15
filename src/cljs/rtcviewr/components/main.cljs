(ns rtcviewr.components.main
  (:require [rtcviewr.components.header :refer [header]]
            [rtcviewr.components.control :refer [control]]))

(defn main
  "Main layout of application"
  []
  [:main
    [header]
    [:video {:className "mini-video"}]
    [:video {:className "remove-video"}]
    [control]
  ])