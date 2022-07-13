import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path"

const password: string = "xbcikwgrdvnxakio";
const email: string = "ivanfabrianos@gmail.com";

const SendingEmail = (to: string, unix: string): boolean => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  const handlebarOptions: any = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
  };

  transporter.use('compile', hbs(handlebarOptions));

  const mailOptions = {
    from: email,
    to: to,
    subject: "New password account verification",
    template: 'email',
    context: {
        name: "Bintang",
        unix: unix
    }
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
  
  return true
};

export default SendingEmail;
