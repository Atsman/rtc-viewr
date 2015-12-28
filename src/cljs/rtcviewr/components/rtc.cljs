(ns rtcviewr.components.rtc)

(def localStream (atom nil))
(def remoteStream (atom nil))
(def pc (atom nil))
(def initiator (atom nil))

(defn onIceCandidate [e]
  (let [candidate (.-candidate e)]
    (if candidate 
      (sendMessage {
        :type "candidate" 
        :label (.-sdpMLineIndex candidate) 
        :id (.-sdpMid candidate)
        :candidate (.-candidate candidate)}))))

(defn onRemoteStreamAdded [e]
  (js/attachMediaStream remoteVideo (.-stream e))
  (reset! remoteStream (.-stream e)))

(def pc_constr (clj->js {"optional" [{"DtlsSrtpKeyAgreement" true}]}))
(defn createPeerConnection []
  (reset! pc (.RTCPeerConnection pc_config pc_constr))
  (set! (.-onicecandidate @pc) onIceCandidate)
  (set! (.-onaddstream @pc) onRemoteStreamAdded))

(defn doCall []
  )

;USERMEDIA START

(def media-constr
  (clj->js {"audio" true video {"mandatory" {} "optional" []}}))
  
(defn onUserMediaFail [e]
  (println e))

(defn onUserMediaSuccess [stream]
  (js/attachMediaStream localVideo stream)
  (createPeerConnection)
  (reset! localStream stream)
  (.addStream @pc)
  (if initiator
    (doCall)))

(defn doGetUserMedia []
  (js/getUserMedia media-constr onUserMediaSuccess onUserMediaFail))
;USERMEDIA END