(ns rtcviewr.components.rtc
  (:require [rtcviewr.stores.state :refer [app-state]]
            [rtcviewr.actions.rtc :refer [create-simple-webrtc]]
            [reagent.core :as r]))

(defn init-webrtc [rtc]
  (.on rtc "readyToCall" 
    (fn[] 
      (.joinRoom rtc "myroom1"))))

(defn on-component-did-mount []
  (create-simple-webrtc init-webrtc))

(defn rtc-component []
  [:div
    [:video {:id "mini-video"}]
    [:dev {:id "remotesVideos"}]])

(def rtc
  (with-meta rtc-component
    {:component-did-mount on-component-did-mount}))