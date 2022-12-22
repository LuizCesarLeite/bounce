require('dotenv').config();
const express = require('express');
const sgMail = require('@sendgrid/mail');
const conecta = require('./db/connec.js');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('< h1 > Acreditamos que você não deveria estar por aqui... #goHomePage < /h1>');
});

routes.post('/', (req, res) => {

    let preResposta = JSON.stringify(req.body);
    let resposta = JSON.parse(preResposta);
    var toEmail = (resposta.email);
    var tentativa = (resposta.attempt);
    // console.log(toEmail);

    async function pegaUser() {

        let sender = await conecta.query(` SELECT user_id FROM collected_addresses WHERE email='${toEmail}' `);
        let senderId = sender.rows[0].user_id;
        // console.log(senderId);

        let senderName = await conecta.query(` SELECT username FROM users WHERE user_id='${senderId}' `);
        var senderEmail = senderName.rows[0].username;
        console.log(senderEmail);

        if (tentativa == 3) {

            (async() => {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);

                const msg = {
                    to: senderEmail,
                    from: 'postmaster@botike.com.br',
                    subject: 'Destinatário não encontrado: ' + toEmail,
                    text: 'Deu ruim: o servidor de destino não aceitou o email ' + toEmail + ' - verifique se o endereço é esse mesmo!',
                    // html: '<strong>Node.js + SendGrid = sonho</strong>',
                }

                try {
                    const result = await sgMail.send(msg);
                    console.log('Parece que foi, PARECE!', result);
                } catch (error) {
                    console.error(error)
                }
            })();

        } else {
        console.log('Ainda não esgotaram as tentativas');
        }
    }
    pegaUser();

    return res.send('JSON suavão!');

})

module.exports = routes;