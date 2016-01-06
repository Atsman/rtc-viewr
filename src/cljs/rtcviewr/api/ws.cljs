(ns rtcviewr.api.ws
  (:import 
    [goog.net WebSocket]
    [goog.events EventHandler]))

(def WS_EVENT_TYPE WebSocket.EventType)

;http://google.github.io/closure-library/api/class_goog_net_WebSocket.html
(defn createWebSocket [{:keys [onOpen onMessage onError]}]
  (let [ws (WebSocket.) handler (EventHandler.)]
      (.listen handler ws WS_EVENT_TYPE.OPENED onopen)
      (.listen handler ws WS_EVENT_TYPE.MESSAGE onmessage)
      (.listen handler ws WS_EVENT_TYPE.ERROR onerror)
      ws))

;event listeners
(defn onopen [e]
  (.send ws
    (.stringify js/JSON (js-obj "type" "getall"))))

(defn onerror [data]
  (.log js/console data))

(defn onmessage [e]
  (let [msgs (.parse js/JSON (.-message e))]
       (.log js/console msgs)))

(def ws (createWebSocket {
  :onOpen onopen 
  :onMessage onmessage 
  :onError onerror
}))

(.open ws "ws://127.0.0.1:8080/ws")

(defn send-to-server []
  (.send ws (.stringify js/JSON (js-obj "msg" "test"))))