import { transporter } from "../config/mailer"

const sendEmail = (
    to: string,
    subject: string,
    html: string
)=>{
    transporter.sendMail({
        from: '"Danny Funk" <danny21@ethereal.email>',
        to,
        subject,
        html,

    }, (error: any, info: any)=>{
        if(error){
            console.log("error al enviar el correo", error);
            
        }
        else{
            console.log("correo enviado");
            console.log(info);
            
            
        }
    });
};

export default sendEmail;