(ns rtcviewr.core
  (:require [reagent.core :as r]
            [goog.dom :as dom]
            [rtc]
            [rtcviewr.components.header :as h]))

(defn getMainElement []
  (.querySelector js/document "main"))

(defn hello-world [name]
  [:div (str "Hello World " name)])

(defn main-el
  []
  [:main
    [h/header]
    [:video.mini-video]
    [:video.remote-video]
    ])

(defn main
  []
  (r/render-component [main-el]
    (getMainElement)))

(main)