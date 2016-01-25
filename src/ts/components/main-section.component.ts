import {Component} from 'angular2/core';

@Component({
  selector: 'main-section',
  template: `
    <video id="mini-video" autoplay></video>
    <video id="remote-video" autoplay></video>
    <div class="controls">
      <a href="#" class='controls-item controls-item--mute' (click)="muteAudio()">
        <i class="fa fa-microphone"></i>
      </a>
      <a href="#" class='controls-item controls-item--offvideo' (click)="muteVideo()">
        <i class="fa fa-video-camera"></i>
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
export class MainSectionComponent {
  public muteAudio(): void {
    console.log('muteAudio');
  }

  public muteVideo(): void {
    console.log('muteVideo');
  }

  public expandFullScreen(): void {
    console.log('expandFullScreen');
  }

  public hangup(): void {
    console.log('hangup');
  }
}