import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'danny21@ethereal.email',
        pass: 'FggEYUUNVfXM7P2GXg'
    }
});

transporter.verify().then(()=>{
    console.log("puede enviar correos");
    
}).catch((error)=>{
    console.log("Error al enviar correos", error);
    
});