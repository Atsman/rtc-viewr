(ns rtcviewr.core
  (:require [reagent.core :as r]
            [goog.dom :as dom]
            [rtc]))

(defn getMainElement []
  (.querySelector js/document "main"))

(defn hello-world [name]
  [:div (+ "Hello World " name)])

(defn main
  []
  (r/render-component [hello-world "Oleg"]
    (getMainElement)))

(main)