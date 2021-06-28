const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const config = require("./config.js");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: 465,
    auth: {
        user: user,
        pass: pass,
    },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    console.log({ user, pass })
    console.log(transport.auth)
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};

// jwt.sign(
//     {
//         user: _.pick(user, 'id'),
//     },
//     EMAIL_SECRET,
//     {
//         expiresIn: '1d',
//     },
//     (err, emailToken) => {
//         const url = `http://localhost:3000/confirmation/${emailToken}`;

//         transporter.sendMail({
//             to: args.email,
//             subject: 'Confirm Email',
//             html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
//         });
//     },
// );
