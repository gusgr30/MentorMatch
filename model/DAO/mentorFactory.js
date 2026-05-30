import ModeloMem from './mentorMem.js'

class MentorFactory{

    static get(modo){
        switch(modo){
            case "MEM":
                return new ModeloMem()
            default:
                return
        }
    }
}

export default MentorFactory