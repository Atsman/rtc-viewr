(ns rtcviewr.components.main
  (:require [rtcviewr.components.control :refer [header-component control-component]]))

(defn main
  "Main layout of application"
  []
  [:main
    [header-component]
    [:video {:id "mini-video"}]
    [:dev {:id "remotesVideos"}]
    ;[:video {:id "remove-video"}]
    [control-component]])