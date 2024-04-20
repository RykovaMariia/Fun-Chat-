import './message.scss';
import { BaseComponent } from 'Components/base-component';
import { MessageResponse } from 'Interfaces/ws-response';
import { messageService } from 'Services/chat-services/message-service';

function translateDate(date: number) {
  const newDate = new Date(date);

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
    .format(newDate)
    .replace('/', '.')
    .replace('/', '.');
}

export class Message extends BaseComponent {
  constructor(message: MessageResponse) {
    super({
      tagName: 'div',
      classNames: 'message',
    });

    this.setClassName(
      message.status.isReaded || message.to === messageService.getOpenChatUser()
        ? 'message_read'
        : 'message_unread',
    );
    const messageWrapper = new BaseComponent({ tagName: 'div', classNames: 'message__wrapper' });

    if (message.from !== messageService.getOpenChatUser()) {
      this.setClassName('message_left');
      messageWrapper.setClassName('message__wrapper_left');
    }

    const fromName = new BaseComponent({ tagName: 'div', textContent: message.from });
    const dateTime = new BaseComponent({
      tagName: 'div',
      textContent: translateDate(message.datetime),
    });
    const messageInfo = new BaseComponent({ tagName: 'div', classNames: 'message__info' });
    messageInfo.appendChildren([fromName, dateTime]);

    const messageText = new BaseComponent({
      tagName: 'div',
      classNames: 'message__text',
      textContent: message.text,
    });

    const status = new BaseComponent({
      tagName: 'div',
      classNames: 'message__status',
      textContent: 'status',
    });

    messageWrapper.appendChildren([messageInfo, messageText, status]);

    this.appendChild(messageWrapper);
  }
}