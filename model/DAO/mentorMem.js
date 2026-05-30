class MentorMem{
    #mentores = []

    constructor(){
        const mentores = [
            {id: "1", nombre: "julieta"},
            {id: "2", nombre: "gustavo"}
        ]
        this.#mentores = mentores
    }

    obtenerMentor = async id => {
        const mentor = this.#mentores.find(m => m.id == id)
        return mentor || {}
    }

    obtenerMentores = async () => {
        return this.#mentores
    }
}

export default MentorMem