(ns rtcviewr.components.commons)

(defn link 
  [data]
  [:a {:className (:a-class data)}
    [:i-class {:className (:i-class data)}]])