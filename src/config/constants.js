module.exports = ({
    PROTOCOL: (process.env.NODE_ENV === 'development') ? 'http://' : 'http://',
    SERVER_NAME : 'localhost:8080/',
    APP_VERSION : '1.0.0',
    APP_LANGUAGE: 'English',
    APP_NAME: 'Epayment',
    AP_AUTHOR: {
        name: 'ADJARO OGAGA',
        contact: 'ogagaadjaro@gmail.com'
    },
    PORT :  process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : (process.env.NODE_ENV === 'test' ? 3030 : 4000),
     MONGO_URI : 'mongodb+srv://ogaga:1986LORDo@cluster0-yuz76.azure.mongodb.net/epayment?retryWrites=true&w=majority',
    // MONGO_URI : 'mongodb://localhost/epayment',
    MONGO_OPTIONS : {
        useNewUrlParser: true ,
        useUnifiedTopology : true, // to use the mongodb engine ... removing reconnecTries && autoReconect & reconnect interval option
        useFindAndModify : false, // to use the querries findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify()
        useCreateIndex : true, // to remove deprecation warnings
        autoIndex : false, // dont build autoindexes for production
        bufferCommands : false, // disable buffer commands
        poolSize: 10,
        serverSelectionTimeoutMS : Number.MAX_VALUE, // keep retrying for eternity
        connectTimeoutMS : 10000, // Times out connectio after 10 seconds
        socketTimeoutMS : 45000,   // close sockets after 45 seconds of inactity
        family : 4,
    },
    MONGO_URI_TEST :'mongodb+srv://ogagatest:ogagatest@cluster0.dcflv.azure.mongodb.net/ogagatest?retryWrites=true&w=majority',
    MONGO_OPTIONS_TEST : { 
        useNewUrlParser: true ,
        useUnifiedTopology : true, // to use the mongodb engine ... removing reconnecTries && autoReconect & reconnect interval option
        useFindAndModify : false,
        // server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
        // replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
      },
    // jwt constants
    SECRET:'ab03adae4e9ea7ae73110599f87481a714c455735dcce96ae50432db4a6d540ee9b7d12c4c527c11f643a0edbfccf97fb282a8bc6bae86978cdb076d388d5787',
    FlutterwavePubicKey : "FLWPUBK_TEST-540f85a9dc35777f0c911a56b4f388a4-X",
    FlutterWaveSecretKey : "FLWSECK_TEST-c87625893dd1c07a03fc8162a7e24a06-X"

})