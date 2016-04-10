import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import SimpleWebRtc = require('simplewebrtc');
import {AppStore} from '../redux/AppStore';
import {Observable} from 'rxjs';
import {InterviewActions} from '../redux/Interview';

@Component({
  selector: 'video-section',
  directives: [NgClass],
  template: `
    <div class="mini">
      <a id="mini-video-link" class="make-main">
        <video id="mini-video" class="mini-video" autoplay></video>
      </a>
    </div>
    <video id="remote-video" autoplay></video>
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
  private isFirst: boolean = true;

  constructor(
    private _state: AppStore,
    private interviewActions: InterviewActions
  ) {
    this._state.getUserState().subscribe((userState) => {
      if(!this.webrtc && userState.me) {
        this.initializeWebrtc();
      }
    });

    let prevRoomId;
    this._state.getInterviewState().subscribe((interview) => {
      const newRoomId = interview.roomId;
      if(this.webrtc && prevRoomId !== newRoomId) {
        if(prevRoomId) {
          this.hangup();
        }
        prevRoomId = newRoomId;
        if(prevRoomId) {
          this.joinRoom(prevRoomId);
        }
      }
    });
  }

  private initializeWebrtc() {
    function mergeStreeam(video1: Element, video2: Element) {
      video1.setAttribute('src', video2.getAttribute('src'));
    }

    this.webrtc = new SimpleWebRtc({
      localVideoEl: 'mini-video',
      autoRequestMedia: true,
      nick: this._state.getMe().username
    });

    const remoteVideo = document.getElementById('remote-video');

    this.webrtc.on('videoAdded', (video, peer) => {
      console.log('video added', peer);
      if(this.isFirst) {
        remoteVideo.setAttribute('src', video.getAttribute('src'));
        mergeStreeam(remoteVideo, video);
        this.isFirst = false;
      }

      const mini = document.querySelector('.mini');
      if(mini) {
        const a = document.createElement('a');
        a.classList.add('make-main');
        a.id = 'container_' + getDomId(peer);
        video.classList.add('mini-video');
        a.addEventListener('click', () => {
          mergeStreeam(remoteVideo, video);
        });
        a.appendChild(video);
        video.oncontextmenu = function () { return false; };
        mini.appendChild(a);
      }
    });

    this.webrtc.on('videoRemoved', (video, peer) => {
      console.log('video removed ', peer);
      const mini = document.querySelector('.mini');
      const a = document.getElementById(peer ? 'container_' + getDomId(peer) : 'localScreenContainer');
      if (mini && a) {
        mini.removeChild(a);
      }
    });
  }

  public joinRoom(id) {
    console.log('join room id: ', id);
    this.webrtc.on('readyToCall', () => {
      this.interviewActions.start();
      this.webrtc.joinRoom(id);
      this.webrtc.mute();
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
    this.interviewActions.hangup();
  }
}

function getDomId(peer) {
  return [peer.id, peer.type, peer.broadcaster ? 'broadcasting' : 'incoming'].join('_');
}
