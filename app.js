const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

mongoose.Promise = global.Promise;
//Connect to mongoose
mongoose.connect('mongodb://<hasanbisha>:<123Kleaklea>@ds137643.mlab.com:37643/help-ally', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDb connected'))
    .catch((err) => console.log('err'));

//Load idea Model
require('./models/Camp');

//Load the model in a variable
const Camp = mongoose.model('camps');

//Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/camps', (req, res) => {
    Camp.find({})
        .then((camps) => {
            res.render('camps/index', {
                camps: camps
            });
        });
});

app.get('/camps:id', (req, res) => {
    Camp.findOne({
        _id: req.params.id
    })
        .then(camp => {
            res.render('/camps/camp', {
                camp: camp
            });
        });
});

app.get('/addCamp', (req, res) => {
    res.render('addCamp/index');
});

app.post('/addCamp', (req, res) => {
    const NewCamp = {
        name: req.body.name,
        cliConditions: req.body.cliConditions,
        infConditions: req.body.infConditions,
        wacConditions: req.body.wacConditions,
        faConditions: req.body.faConditions,
        fAcess: req.body.fAcess,
        relief: req.body.relief,
        mLink: req.body.mLink
    }

    new Camp(NewCamp)
        .save()
        .then((camps) => {
            res.redirect('/camps');
        });

});

app.listen(4000, () => {
    console.log('Server started at port 4000');
}); 