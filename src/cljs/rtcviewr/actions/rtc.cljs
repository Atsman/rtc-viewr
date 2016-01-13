(ns rtcviewr.actions.rtc
  (:require [rtcviewr.stores.state :refer [app-state]]))

(defn simple-webrtc []
  (js/SimpleWebRTC.
    #js {
      :localVideoEl "mini-video"
      :remoteVideosEl "remotesVideos"
      :autoRequestMedia true}))

(defn create-simple-webrtc [cb]
  (.log js/console "rtc - create-simple-webrtc")
  (let [rtc (simple-webrtc)]
    (swap! app-state assoc-in [:rtc] rtc)
    (cb rtc)))

(defn join-room [id]
  (.log js/console "rtc - join-room")
  (let [rtc (:rtc app-state)]
    (if rtc
      (.joinRoom rtc id))))