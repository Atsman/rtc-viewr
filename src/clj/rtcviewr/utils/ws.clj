(ns rtcviewr.utils.ws
  (:use org.httpkit.server)
  (:require [cheshire.core :refer :all]))

(defn send-json! [channel msg]
  (send! channel (generate-string msg)))