const Pets = require('../models/Pets');
const validator = require('validator');

const controller = {

    save: (req, res) => {
        //Recoger parametros por post con destructuring
        const { body } = req

        // Validar datos (name, type, description)
        try{
            const validateName = !validator.isEmpty(body.name)
            const validateType = !validator.isEmpty(body.type)
            const validateDescription = !validator.isEmpty(body.description)

            if(validateName && validateType && validateDescription){
                const pet = new Pets(body)
                pet.save((err, petStored) => {
                    // Si hay un error
                    if(err || !petStored){
                        return res.status(500).send({
                            status: 'error',
                            message: 'No se pudo registrar la mascota :('
                        })
                    }
                    //Devolver respuesta
                    return res.status(201).send({
                        status: 'success',
                        pet: petStored
                    })
                })
            }
        }catch(err){
            return res.status(400).send({
                status: 'error',
                message: 'Faltan datos para registrar a la mascota'
            })
        }
    },

    petUpdate: (req,res) => {
        // Obtener id de los parametros
        const { id } = req.params

        // Obtener parametros por post
        const { body } = req
        
        Pets.findByIdAndUpdate(id, body, {new: true}, (err, petUpdated) => {
            if(err || !petUpdated){
                return res.status(500).send({
                    status: 'error',
                    message: 'No se pudo actualizar el registro de la mascota'
                })
            }

            return res.status(201).send({
                status: 'success',
                petUpdated
            })
        })

    },

    // Obtener todas las mascotas
    getPets: (req, res) => {
        const pets = Pets.find().sort('-_id').exec((err, pets) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver las mascotas'
                })
            }

            // Si no hay mascotas devolver mensaje de error
            if(!pets || pets == null){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay mascotas para mostrar :('
                })
            }

            // Devolver listado de mascotas
            return res.status(200).send({
                status: 'success',
                pets
            })
            
        })
    }, // End getPets

    // Obtener una mascota en especifíco
    getPet: (req, res) => {
        //Obtener el id desde los parametros
        const { id } = req.params
        
        // Find and response
        const pet = Pets.findById(id, (err, pet) => {
            if(err || !pet){
                return res.status('404').send({
                    status: 'error',
                    message: 'No se encuentra la mascota que busca, puede que no exista !'
                })
            }

            //Devolver respuesta JSON
            return res.status(200).send({
                status: 'success',
                pet
            })
        });

    }, //End getPet

    // Dar de alta una mascota
    release: (req, res) => {
        // Obtener id desde los parametros
        const { id } = req.params

        // Find and delete
        Pets.findOneAndDelete({_id: id}, (err, petReleased) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'No se pudo dar de alta a la mascota'
                })
            }

            if(!petReleased){
                return res.status(404).send({
                    status: 'error',
                    message: 'La mascota ya fue dada de alta, no se ecuentra registrada'
                })
            }

            return res.status(200).send({
                status: 'success',
                message: 'mascota dada de alta exitosamente',
                mascota: petReleased
            })
        })
    }



} // End controller


module.exports = controller;