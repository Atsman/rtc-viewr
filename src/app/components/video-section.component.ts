import {Component, OnInit, Input, Inject} from 'angular2/core';
import {NgClass} from 'angular2/common';
import SimpleWebRtc = require('simplewebrtc');
import {APP_STATE, DISPATCHER, AppState} from '../state/state';
import {Observable} from 'rxjs';

@Component({
  selector: 'video-section',
  directives: [NgClass],
  template: `
    <video id="mini-video" autoplay></video>
    <div id="remotesVideos"></div>
    <div class="controls">
      <a class='controls-item controls-item--mute' (click)="muteAudio()">
        <i class="fa" [ngClass]="{
          'fa-microphone': !isMuted,
          'fa-microphone-slash': isMuted
        }">
        </i>
      </a>
      <a class='controls-item controls-item--offvideo' (click)="pauseVideo()">
        <i class="fa" [ngClass]="{
          'fa-eye': !isVideoPaused,
          'fa-eye-slash': isVideoPaused
        }"></i>
      </a>
      <a href="#" class='controls-item controls-item--expand' (click)="expandFullScreen()">
        <i class="fa fa-expand"></i>
      </a>
      <a href="#" class='controls-item controls-item--hangup' (click)="hangup()">
        <i class="fa fa-phone"></i>
      </a>
    </div>
  `
})
export class VideoSectionComponent implements OnInit {
  public webrtc;
  public isMuted: boolean = false;
  public isVideoPaused: boolean = false;

  constructor(@Inject(APP_STATE) private _state: Observable<AppState>) {

  }

  public ngOnInit(): void {
    const webrtc = new SimpleWebRtc({
      localVideoEl: 'mini-video',
      remoteVideosEl: 'remotesVideos',
      autoRequestMedia: true
    });

    webrtc.on('readyToCall', () => {
      this._state
        .map(appState => appState.interview.id)
        .subscribe(webrtc.joinRoom.bind(webrtc));
    });

    /*webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
        var remotes = document.getElementById('remotes');
        if (remotes) {
            var container = document.createElement('div');
            container.className = 'videoContainer';
            container.id = 'container_' + webrtc.getDomId(peer);
            container.appendChild(video);

            // suppress contextmenu
            video.oncontextmenu = function () { return false; };

            remotes.appendChild(container);
        }
    });*/

    this.webrtc = webrtc;
  }

  public muteAudio(): void {
    if(this.isMuted) {
      this.webrtc.unmute();
      this.isMuted = false;
    } else {
      this.webrtc.mute();
      this.isMuted = true;
    }
  }

  public pauseVideo(): void {
    if(this.isVideoPaused) {
      this.webrtc.resumeVideo();
      this.isVideoPaused = false;
    } else {
      this.webrtc.pauseVideo();
      this.isVideoPaused = true;
    }
  }

  public expandFullScreen(): void {
    console.log('expandFullScreen');
  }

  public hangup(): void {
    console.log('hangup');
  }
}
