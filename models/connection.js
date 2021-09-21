const mongoose = require('mongoose')

const DB = 'mongodb+srv://lacapsule:EXIrgUdaFEllfNSH@cluster0-9xbpy.mongodb.net/blackboard?retryWrites=true&w=majority'

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
 }

mongoose.connect(DB, options)
    .then( () => {
    console.log('DB connection successful')
    })
    .catch(err => console.log(err))