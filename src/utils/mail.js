import nodemailer from "nodemailer"
import mailgen from "mailgen"

const sendMail = async (options) => {
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Task manager',
            link: 'https://mailgen.js/'
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
        }
    });
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    var emailHtml = mailGenerator.generate(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD,
        },
    });

    const mail = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: options.email,
            subject: options.subject,
            text: emailText,
            html: emailHtml,
        }
    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("email sending failed", error)
    }
}

const emailVarificationMailGenmail = (username, verificaitonUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to App! We\'re very excited to have you on board.',
            action: {
                instructions: 'To verify your password click here',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Vetify your email',
                    link: verificaitonUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'we got a request to reset your password',
            action: {
                instructions: 'To change your password click this button',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset password',
                    link: passwordResetUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

// sendMail({
//     email: user.email,
//     subject: "hello",
//     mailGenContent: emailVarificationMailGenmail(
//         username,
//         ``
//     )
// })

