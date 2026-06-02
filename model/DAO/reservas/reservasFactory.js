import ReservasMongoDB from "./reservasMongoDb.js"

class ReservasFactory {
    
    static get(tipo) {
        switch(tipo) {
                
            case 'MONGODB':
                console.log('**** Persistiendo en MongoDB Database ****')
                return new ReservasMongoDB()

            default:
                console.log('**** Persistiendo en MONGODB (default) ****')
                return new ReservasMongoDB()
        }
    }        
}

export default ReservasFactory