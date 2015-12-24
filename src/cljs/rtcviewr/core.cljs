(ns rtcviewr.core
  (:require [reagent.core :as r]
            [rtc]
            [rtcviewr.components.main :refer [main]]
            [rtcviewr.components.toolbarmanager :refer [toolbarManager]]))

(defn qs [selector]
  (.querySelector js/document selector))

(defn init!
  []
  (r/render-component [main]
    (qs ".main")))

(init!)

(toolbarManager (qs ".header") (qs ".controls"))

(def conn 
  (js/WebSocket. "ws://127.0.0.1:8080/ws"))

(set! (.-onopen conn)
  (fn [e]
    (.send conn
      (.stringify js/JSON (js-obj "command" "getall")))))

(set! (.-onerror conn) 
  (fn [data]
    (.log js/console data)))

(set! (.-onmessage conn)
  (fn [e]
    (let [msgs (.parse js/JSON (.-data e))]
         (.log js/console msgs))))

(defn send-to-server []
  (.send conn (.stringify js/JSON (js-obj "msg" "test"))))

