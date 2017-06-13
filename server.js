"use strict";
//Requiere
const
    express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    port = process.env.PORT || 3000,
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './img');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now());
        }
    });
// Utilisation de app, c'est a dire d'express
// Important: il faut que l'ordre des middlewares suivants soit respecté.
app
    .all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static('public'))
var upload = multer({ storage: storage }).single('userPhoto');

mongoose.connect('mongodb://localhost/help');


const contactSchema = mongoose.Schema({
    tel: String,
    mail: String,
    back: String
}),
    contact = mongoose.model("contact", contactSchema),
    route = express.Router();
app.post("/", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.send({ message: "ok" });
        console.log("ok")
    });
})
route
    .route("/")
    .get(function (req, res) {
        contact.find(function (err, contact) {
            if (err) {
                res.send(err)
            }
            res.json({ contact })
        })
    })
    .post(function (req, res) {
        var cont = new contact();
        cont.tel = req.body.tel;
        cont.mail = req.body.mail;
        cont.back = req.body.back;
        cont.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: "contact posté" })
        })
    })
route
    .route('/:cont_id')
    .get(function (req, res) {
        contact.findOne({ _id: req.params.cont_id }, function (err, cont) {
            if (err) {
                res.send(err);
            }
            res.json({ cont });
        });
    })
    .put(function (req, res) {
        contact.findOne({ _id: req.params.cont_id }, function (err, cont) {
            if (err) {
                res.send(err);
            }
            cont.tel = req.body.tel;
            cont.mail = req.body.mail;
            cont.img = req.body.img

            cont.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.send({ message: 'contact update' });
            });
        });
    })
    .delete(function (req, res) {
        contact.remove({ _id: req.params.cont_id }, function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'cont deleted' });
        });
    });
app.use("/contact", route);

app.listen(port, function () {
    console.log("Adresse du serveur : http://localhost:" + port);
});

