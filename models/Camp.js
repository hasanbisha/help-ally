const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampSchema = new Schema({
    //Name
    name: {
        type: String,
        required: true
    },

    //Climate conditions
    cliConditions: {
        type: String,
        required: true
    },

    //infractucture conditions
    infConditions: {
        type: String,
        required: true
    },

    //Water access conditions
    wacConditions: {
        type: String,
        required: true
    },

    //Firewood Acess
    faConditions: {
        type: String,
        required: true
    },

    //Food Acess
    fAcess: {
        type: String,
        required: true
    },

    //Relief
    relief: {
        type: String,
        required: true
    },

    //Google Map Link
    mLink: {
        type: String,
        required: true
    }

});

mongoose.model('camps', CampSchema);
