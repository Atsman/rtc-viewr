(ns rtc-viewr.core
  (:require [compojure.core :refer :all]
  					[compojure.route :as route]))

(defroutes app
	(GET "/" [] "<h1>HIIII<h1>"))