(ns rtcviewr.components.control
  (:require [rtcviewr.stores.state :refer [app-state]]))

;common between control and header
(defn link [key data]
  [:a {:key key :className (:a-class data)}
    [:i {:className (:i-class data)}]])

(defn create-links [links-data]
  (map-indexed 
    (fn[idx link-data]
      (link idx link-data)) 
      links-data))

(defn isActive []
  (:active (:controls @app-state)))

(defn getAdditionalClass []
  (if (isActive)
    "active"))

;control section

(def control-links 
  [{:a-class "controls-item controls-item--mute" :i-class "fa fa-microphone"}
   {:a-class "controls-item controls-item--offvideo" :i-class "fa fa-video-camera"}
   {:a-class "controls-item controls-item--expand" :i-class "fa fa-expand"}
   {:a-class "controls-item controls-item--hangup" :i-class "fa fa-phone"}])

(defn control-component []
  [:div {:className (str "controls  " (getAdditionalClass))}
    (create-links control-links)])

;header section

(def item-class "header-nav__item")
(def header-links
  [{:a-class item-class :i-class-class "fa fa-paper-plane"}
   {:a-class (str item-class " chat-btn") :i-class "fa fa-comments"}
   {:a-class item-class :i-class "fa fa-code"}
   {:a-class item-class :i-class "fa fa-cogs"}])

(defn header-component [] 
  [:header {:className (str "header " (getAdditionalClass))}
    [:div.header-inner
      [:div.header-title 
        [:h1 "Interviewr Conference"]]
      [:div.header-actions
        [:nav.header-nav
          (create-links header-links)]]]])