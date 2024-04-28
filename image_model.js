const mongoose =require('mongoose')
const ImageSchema = mongoose.Schema({
    name:{
        type:string,
        required:true
    },
    image:{
        data:Buffer,
        contentType:string
    }
})

module.exports = ImageModel =mongoose.model('imageModel',ImageSchema)