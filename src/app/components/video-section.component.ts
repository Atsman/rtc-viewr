import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import SimpleWebRtc = require('simplewebrtc');
import {AppStore} from '../redux/AppStore';
import {Observable} from 'rxjs';
import {Store} from 'redux';

@Component({
  selector: 'video-section',
  directives: [NgClass],
  template: `
    <video id="mini-video" autoplay></video>
    <div id="remotes"></div>
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
      <a class='controls-item controls-item--expand' (click)="expandFullScreen()">
        <i class="fa fa-expand"></i>
      </a>
      <a class='controls-item controls-item--hangup' (click)="hangup()">
        <i class="fa fa-phone"></i>
      </a>
    </div>
  `
})
export class VideoSectionComponent {
  public webrtc;
  public isMuted: boolean = false;
  public isVideoPaused: boolean = false;
  public isFullscreen: boolean = false;
  private roomId: string;

  constructor(private _state: AppStore) {
    this._state.getUserState().subscribe((userState) => {
      if(!this.webrtc && userState.me) {
        this.initializeWebrtc();
      }
    });

    this._state.getInterviewState().subscribe((interview) => {
      const newRoomId = interview.roomId;
      if(this.webrtc && this.roomId !== newRoomId) {
        this.roomId = newRoomId;
        this.hangup();
        if(this.roomId) {
          this.joinRoom(this.roomId);
        }
      }
    });
  }

  private initializeWebrtc() {
    this.webrtc = new SimpleWebRtc({
      localVideoEl: 'mini-video',
      autoRequestMedia: true,
      nick: this._state.getMe().username
    });

    this.webrtc.on('videoAdded', function (video, peer) {
      console.log('video added', peer);
      var remotes = document.getElementById('remotes');
      if (remotes) {
        var container = document.createElement('div');
        container.className = 'videoContainer';
        container.id = 'container_' + this.webrtc.getDomId(peer);
        video.classList.add('remote-video');
        container.appendChild(video);

        // suppress contextmenu
        video.oncontextmenu = function () { return false; };

        remotes.appendChild(container);
      }
    });

    this.webrtc.on('videoRemoved', function (video, peer) {
      console.log('video removed ', peer);
      var remotes = document.getElementById('remotes');
      var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
      if (remotes && el) {
        remotes.removeChild(el);
      }
    });
  }

  public joinRoom(id) {
    console.log('join room id: ', id);
    this.webrtc.on('readyToCall', () => {
      this.webrtc.joinRoom(id);
    });
  }

  public muteAudio(): void {
    if (this.isMuted) {
      this.webrtc.unmute();
      this.isMuted = false;
    } else {
      this.webrtc.mute();
      this.isMuted = true;
    }
  }

  public pauseVideo(): void {
    if (this.isVideoPaused) {
      this.webrtc.resumeVideo();
      this.isVideoPaused = false;
    } else {
      this.webrtc.pauseVideo();
      this.isVideoPaused = true;
    }
  }

  public expandFullScreen(): void {
    const doc: any = document;
    const video: any = document.querySelector('#remotesVideos > video');
    if (!this.isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // Firefox
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // Chrome and Safari
      }
      this.isFullscreen = true;
    } else {
      if (doc.cancelFullScreen) {
        doc.cancelFullScreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      this.isFullscreen = false;
    }
  }

  public hangup(): void {
    if(this.webrtc) {
      this.webrtc.leaveRoom();
    }
  }
}
