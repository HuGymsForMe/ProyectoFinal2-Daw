import mongoose from "mongoose";

// ******* ESQUEMA DE LOS TESTS ******* //

const testSchema = new mongoose.Schema({
    number_test : {
        type: Number,
        required: true,
    },
})

export default mongoose.model('Test', testSchema);