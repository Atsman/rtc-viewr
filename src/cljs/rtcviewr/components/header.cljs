(ns rtcviewr.components.header
  (:require [rtcviewr.components.commons :refer [link]]))

(def item-class "header-nav__item")

(def links-data
  [{:a-class item-class :i-class-class "fa fa-paper-plane"}
   {:a-class (str item-class " chat-btn") :i-class "fa fa-comments"}
   {:a-class item-class :i-class "fa fa-code"}
   {:a-class item-class :i-class "fa fa-cogs"}])

(defn header
  [] 
  [:header.header
    [:div.header-inner
      [:div.header-title 
        [:h1 "Interviewr Conference"]]
      [:div.header-actions
        [:nav.header-nav
          (for [c links-data]
            (link c))]]]])