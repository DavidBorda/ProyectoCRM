"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_1 = require("../config/mailer");
const sendEmail = (to, subject, html) => {
    mailer_1.transporter.sendMail({
        from: '"Danny Funk" <danny21@ethereal.email>',
        to,
        subject,
        html,
    }, (error, info) => {
        if (error) {
            console.log("error al enviar el correo", error);
        }
        else {
            console.log("correo enviado");
            console.log(info);
        }
    });
};
exports.default = sendEmail;
//# sourceMappingURL=email.js.map