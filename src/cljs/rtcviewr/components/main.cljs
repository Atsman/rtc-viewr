(ns rtcviewr.components.main
  (:require [rtcviewr.components.control :refer [header-component control-component]]
            [rtcviewr.components.rtc :refer [rtc]]
            [rtcviewr.components.toolbarmanager :refer [toolbarManager]]
            [rtcviewr.utils.dom :refer [qs]]
            [reagent.core :as r]))

(defn initializeToolbar
  []
  (toolbarManager (qs ".header") (qs ".controls")))

(defn main-component
  "Main layout of application"
  []
  [:main
    [header-component]
    [rtc]
    [control-component]])

(def main
  (with-meta main-component
    {:component-did-mount initializeToolbar}))