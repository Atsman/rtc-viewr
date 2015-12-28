(ns rtcviewr.api.signaling
  (:use org.httpkit.server)
  (:require 
    [rtcviewr.utils.ws :refer [send-json!]]
    [cheshire.core :refer :all]))

(def GET_ROOM "GETROOM")
(def ENTER_ROOM "ENTERROOM")

(def rooms (atom {}))

(defn- getRandomId []
  (let [rand (java.util.Random. (System/currentTimeMillis))]
    (.nextInt rand)))

(defn- onGetRoom [channel]
  (let [roomNumber (getRandomId)]
    (swap! rooms assoc roomNumber #{channel})
    (send-json! channel {:type GET_ROOM :value roomNumber})))

(defn- onEnterRoom [channel msg]
  (let [roomNumber (:value msg) room (get @rooms roomNumber)]
    (swap! rooms assoc roomNumber (conj room channel))
    (send-json! channel {:type ENTER_ROOM})))

(defn- sendToAll [room message]
  (doseq [channel room]
    (send! channel message)))

(defn- onSendToAll [channel msg]
  (let [roomNumber (:roomId msg)]
    (sendToAll (get @rooms roomId) msg)))

(defn- onMessage [channel msg]
  (let [jmsg (parse-string msg true) mtype (:type jmsg)]
    (cond
      (= GET_ROOM mtype) (onGetRoom channel)
      (= ENTER_ROOM mtype) (onEnterRoom channel jmsg)
      (= SEND_TO_ALL mtype) (onSendToAll channel jmsg)
      :else (send! channel "hi"))))

(defn ws-handler [req]
  (with-channel req channel  ; ws-con bind to the websocket connection
    (on-close channel (fn [status] (println channel "closed")))
    (on-receive channel (fn [msg] (onMessage channel msg)))))