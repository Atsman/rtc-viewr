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

(def webrtc (js/SimpleWebRTC.
  #js {
      :localVideoEl "mini-video"
      :remoteVideosEl "remotesVideos"
      :autoRequestMedia true}))

(.on webrtc "readyToCall" (fn[] 
  (.joinRoom webrtc "myroom1")))