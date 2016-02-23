import {Message} from '../model/chat/message';
import {User} from '../model/user';

export class ShowSidebarAction {constructor(public sectionName: string) {}}
export class ChangeInterviewId {constructor(public id: string) {}}
export class SendMessage {constructor(public message: Message) {}}
export class LoadUser {constructor(public id: string) {}}
export class UserLoaded {constructor(public user: User) {}}
export class MeLoaded {constructor(public user: User) {}}
export class GetMe {constructor() {}}
export class SendCodeChange {constructor(public code: string) {}}
export class ReceiveCodeChange {constructor(public code: string) {}}

export type Action = ShowSidebarAction | ChangeInterviewId | SendMessage | LoadUser | UserLoaded | MeLoaded | GetMe | SendCodeChange | ReceiveCodeChange;
