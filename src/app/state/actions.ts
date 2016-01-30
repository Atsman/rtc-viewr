import {Message} from '../model/chat/message';

export class ShowSidebarAction {}
export class ChangeInterviewId {constructor(public id: string) {}}
export class SendMessage {constructor(public message: Message) {}}

export type Action = ShowSidebarAction|ChangeInterviewId|SendMessage;
