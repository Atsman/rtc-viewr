declare module 'simplewebrtc' {
  export default class SimpleWebRtc {
    constructor(x: any);

    public mute(): any;
    public unmute(): any;
    public pauseVideo(): any;
    public resumeVideo(): any;
    public on(event: string, cd: Function): any;
    public joinRoom(roomId: string): any;
  }
}