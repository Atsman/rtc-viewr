(ns rtcviewr.components.toolbarmanager
  (:require [goog.events :as events]
            [goog.dom :as dom]
            [goog.dom.classlist :as classlist]
            [goog.Timer :as Timer]
            [rtcviewr.utils.dom :refer [isElementDocumentActive?]]
            [rtcviewr.actions.control :refer [show-controls hide-controls]]))

;Idle time in ms before the UI is hidden.
(def HIDE_TIMEOUT 2000)
;Distance from the top of the screen required to reveal the toolbars.
(def TOP_TOOLBAR_REVEAL_DISTANCE 100)
;Distance from the top of the screen required to reveal the toolbars.
(def BOTTOM_CONTROLS_REVEAL_DISTANCE 150)

(def innerState (atom 
  {:toolbar nil 
   :controls nil
   :timerId nil}))

(defn isHighVelocityMouseMove [e]
  (= (.-type e) goog/events.EventType.MOUSEMOVE))

(defn isMouseNearTopToolbar [e]
  (< (.-clientY e) TOP_TOOLBAR_REVEAL_DISTANCE))

(defn isMouseNearControls [e]
  (> (.-clientY e) (- (.-innerHeight js/window) BOTTOM_CONTROLS_REVEAL_DISTANCE)))

(defn isMouseNearManagmentControls [e]
  (or (isMouseNearTopToolbar e) (isMouseNearControls e)))

(defn isInitialized []
  (and (some? (:toolbar @innerState)) (some? (:controls @innerState))))

(defn shouldShowToolbars [e]
  (and 
    (isInitialized) 
    (isHighVelocityMouseMove e) 
    (isMouseNearManagmentControls e)))

(defn showToolbars []
  (if (isInitialized)
    (show-controls)))

(defn isControlsActive []
  (or (isElementDocumentActive? (:toolbar @innerState)) 
      (isElementDocumentActive? (:controls @innerState))))

(defn hideToolbarsIfAllowed []
    (if (isControlsActive)
      (.-blur js/document.activeElement))
    (if (isInitialized)
      (hide-controls)))

(defn callHideTimeout []
  (Timer/callOnce hideToolbarsIfAllowed HIDE_TIMEOUT))

(defn hideToolbarsAfterTimeout []
  (let [timerId (:timerId @innerState)]
    (if timerId
      (.clear goog/Timer timerId))
    (swap! innerState assoc :timerId (callHideTimeout))))

(defn handleMouseMove [e]
  (if (shouldShowToolbars e)
    (showToolbars)
    (hideToolbarsAfterTimeout)))

(defn onWindowMouseMove [handler]
  (events/listen js/window events/EventType.MOUSEMOVE handler))

(defn toolbarManager [toolbar controls]
  (swap! innerState assoc :toolbar toolbar :controls controls)
  (onWindowMouseMove handleMouseMove))
