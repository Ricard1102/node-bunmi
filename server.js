const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const nodemailer = require('nodemailer');
require('dotenv/config');

var app = express();

const port = process.env.PORT || 3000;

//VIEW ENGINE SETUP
hbs.registerPartials(__dirname + '/views/partials');
//app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

//STATIC FOLDER

app.use('/public', express.static(path.join(__dirname + '/public')));

//BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('home.hbs',
    {
      //Head.hbs variables
      keywords: '',
      metaDescription: '',
      pageTitle: 'Bunmi Torres Styling',

      //Header.hbs variables
      logo: 'public/img/logo.png',
      logoCaption: 'Bunmi Torres Styling logo',
      logoTitle: 'Welcome Bunmi Torres Styling',
      // menu1: '',
      // menu2: '',
      // menu3: '',
      // menu4: '',
      // menu5: '',
      //Hero variables
      h1Title: 'Welcome to Bunmi Torres Styling',

      webmail: 'web@web.com',
      twitter_url: '',
      facebook_url: '',
      googleplus_url: '',
      instagram_url: '',
      linkedin_url: '',

      //Maps
      address: 'here goes my address',
      map_link: '',

      //Services variables
      cancellationPolicy1: '',
      cancellationPolicy2: '',
      cancellationPolicy3: '',


      //Contact Variables
      businessPhone: '000 333 999',

      //lightbox.hbs variables
      galleryimg1: 'public/img/Charlie_2.jpg', //first url image of the fallery i.e. public/img/sts1.jpg
      galleryimg2: 'public/img/Charlie_4.jpg',
      galleryimg3: 'public/img/Charlie_5.jpg',
      galleryimg4: 'public/img/Charlie_7.jpg',
      galleryimgalt1: 'First photo title', //first alt
      galleryimgalt2: 'Second photo title',
      galleryimgalt3: '3rd photo title',
      galleryalt4: '4th photo title',
      photoNum1: '1/4',
      photoNum2: '2/4',
      photoNum3: '3/4',
      photoNum4: '4/4'


    });


});

app.post('/send', (req, res) => {
  const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Subject: ${req.body.subject}</li>
    <li>Message: ${req.body.message}</li>
    </ul>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 25, //587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.MAIL_FROM, // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: 'Contact request', // Subject line
    text: 'Hello world', // plain text body
    html: output // html body
  };

  // send mail with defined transport object


  transporter.sendMail(mailOptions, (error, info) => {

    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('partials/thanks', { businessName: 'Bunmi Torres Styling' });



  });

});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});







