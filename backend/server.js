const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
require('dotenv').config(); // Cargar las variables de entorno

const app = express();
const port = 3000;

// Permitir CORS para todas las solicitudes
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar el formulario
app.post('/enviar-correo', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Datos recibidos del formulario:', { name, email, message });

    // Configurar el transporte de correo (puedes usar Gmail o cualquier otro servicio)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,  // Usar la variable de entorno
            pass: process.env.GMAIL_PASS,  // Usar la variable de entorno
        },
    });

    // Configurar el mensaje
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.DESTINATARIO,
        subject: 'Nuevo mensaje de contacto',
        html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        background-color: #040013;
                        color: #fff;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 650px;
                        margin: 0 auto;
                        background-color: #1a1a1a;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    }
                    h1 {
                        color: #e63946;
                        font-size: 28px;
                        margin-bottom: 20px;
                        text-align: center;
                        font-weight: bold;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 10px;
                    }
                    .label {
                        font-weight: bold;
                        color: #e63946;
                    }
                    .message {
                        padding: 15px;
                        background-color: #333;
                        border-left: 4px solid #e63946;
                        border-radius: 5px;
                        font-size: 14px;
                        font-style: italic;
                        color: #f1f1f1;
                    }
                    .footer {
                        text-align: center;
                        font-size: 12px;
                        color: #aaa;
                        margin-top: 30px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Nuevo mensaje de ${req.body.name}</h1>
                    <p><span class="label">Correo:</span> ${req.body.email}</p>
                    <p><span class="label">Mensaje:</span></p>
                    <div class="message">${req.body.message}</div>
                </div>
            </body>
            </html>
        `,
    };
    
    
    

    // Enviar el mensaje
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
            return res.status(500).send('Hubo un error al enviar el mensaje');
        }
        console.log('Correo enviado:', info.response);
        res.status(200).send('Mensaje enviado correctamente');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
