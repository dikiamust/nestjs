import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import { convert } from 'html-to-text';

export const sendEmail = async (template, data, mailOptions ) => {
  return new Promise(function (resolve, reject) {

    const configSecure = {
      secure: true, 
      requireTLS: true,
      port: 465,
      secured: true, 
    };

    // if you using smtp sendGrid
    const sengridSmtpConfig = {
      host: process.env.MAIL_HOST,
      debug: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };

    const smtpConfig = {
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD_GENERATED
      }
    };
      
    const transporter = nodemailer.createTransport({...configSecure, ...smtpConfig});

    const file = fs.readFileSync(template, 'utf-8');
    const tpl = Handlebars.compile(file);
    const emailHTML = tpl(data);
    mailOptions.html = emailHTML;

    const txt = convert(emailHTML, { wordwrap: 130 });
    mailOptions.text = txt;

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log('error from mailer', err);
        reject(err);
      } else {
        console.log('Email sent to ' + mailOptions.to);
        resolve('Email has been send');
      }
    })
  })
}

