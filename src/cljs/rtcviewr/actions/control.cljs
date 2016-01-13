(ns rtcviewr.actions.control
  (:require [rtcviewr.stores.state :refer [app-state]]))

(defn update-controls-active-state
  [isActive]
  (swap! app-state update-in [:controls] assoc :active isActive))

(defn hide-controls
  "Hides header toolbar and video control elements"
  []
  (.log js/console "controls - hide-controls")
  (update-controls-active-state false))

(defn show-controls
  "Shows header toolbar and video control elements"
  []
  (.log js/console "controls - show-controls")
  (update-controls-active-state true))