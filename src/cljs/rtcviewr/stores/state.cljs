(ns rtcviewr.stores.state
  (:require [reagent.core :as r]))

(def app-state
  (r/atom {:controls {:active false}}))