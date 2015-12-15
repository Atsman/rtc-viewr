(ns rtcviewr.components.control
  (:require [rtcviewr.components.commons :refer [link]]))

(def control-list 
  [{:a-class "controls-item controls-item--mute" :i-class "fa fa-microphone"}
   {:a-class "controls-item controls-item--offvideo" :i-class "fa fa-video-camera"}
   {:a-class "controls-item controls-item--expand" :i-class "fa fa-expand"}
   {:a-class "controls-item controls-item--hangup" :i-class "fa fa-phone"}])

(defn control
  []
  [:div.controls
    (for [c control-list]
      (link c))])