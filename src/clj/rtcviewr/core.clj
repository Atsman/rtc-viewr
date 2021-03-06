(ns rtcviewr.core
  (:use org.httpkit.server)
  (:require [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.response :refer [render]]
            [clojure.java.io :as io]
            [rtcviewr.api.signaling :refer [ws-handler]]))


;; This is a handler that returns the
;; contents of `resources/index.html`
(defn home
  [req]
  (render (io/resource "index.html") req))

;; Defines a handler that acts as router
(defroutes app
  (GET "/" [] home)
  (GET "/ws" [] ws-handler)
  (route/resources "/static")
  (route/not-found "<h1>Page not found</h1>"))

;; Application entry point
(defn -main
  [& args]
  (let [app (wrap-defaults app site-defaults)]
    (run-server #'app {:port 4502 :join? false})))