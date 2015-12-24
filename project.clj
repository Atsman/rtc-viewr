(defproject rtc-viewr "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :dependencies [
  	[org.clojure/clojure "1.7.0"]
  	[compojure "1.4.0"]
    [ring/ring-core "1.4.0"]
    [ring/ring-servlet "1.4.0"]
    [ring/ring-defaults "0.1.5"]
    [http-kit "2.1.19"]

    [org.clojure/clojurescript "1.7.170"]
    [reagent "0.5.1"]]

  :source-paths ["src/clj"]
  :main ^:skip-aot rtcviewr.core
  :plugins [
    [lein-cljsbuild "1.1.1"]
    [lein-npm "0.6.1"]]

  :profiles {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                                  [ring/ring-mock "0.3.0"]]}}
  :cljsbuild {:builds
              [{:id "app"
                :source-paths ["src/cljs"]
                :compiler {:output-to "resources/public/js/app.js"
                           :output-dir "resources/public/js/out"
                           :source-map true
                           :optimizations :none
                           :asset-path "/static/js/out"
                           :main "rtcviewr.core"
                           :pretty-print true
                           :foreign-libs [
                              {:file "./node_modules/webrtc-adapter-test/adapter.js"
                               :provides ["rtc"]
                               }]}}]}

  :npm {:dependencies [webrtc-adapter-test "0.2.5"]})