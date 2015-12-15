(ns rtcviewr.components.header)

(def item-class "header-nav__item")

(def links-data
  [{:a-class item-class :i "fa fa-paper-plane"}
   {:a-class (str item-class " chat-btn") :i "fa fa-comments"}
   {:a-class item-class :i "fa fa-code"}
   {:a-class item-class :i "fa fa-cogs"}])

(defn link 
  [data]
  [:a {:className (:a-class data)}
    [:i {:className (:i data)}]])

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