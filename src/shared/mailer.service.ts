import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get('SENDGRID_API'));
  }

  async sendEmailAfterAnswer(email: string, answerer: string, answer: string): Promise<void> {
    const msg: sgMail.MailDataRequired = {
      to: email,
      from: 'tatopanchulidze@gmail.com', // change email next
      subject: answerer + ' answer you question ',
      text: answer,
    }

    sgMail.send(msg)
  }
}