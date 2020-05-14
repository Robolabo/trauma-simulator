const controller = {}

let actionsJson = {
    "inspection":{
      
      "messages":[
        "No se han encontrado anomalías durante la inspección de la vía aérea.",
        "Se han encontrado cuerpos extraños durante la inspección de la vía aérea."
      ],
      
      "attachment": null
    },

    "clean":{
      
      "messages":[
        "Aspirando los cuerpos extraños encontrados.",
        "La vía aéra se encuentra limpia."
      ],
      
      "attachment": null
    },
    
    "dialog":{
      
      "messages":[
        "El paciente responde con normalidad al diálogo.",
        "El paciente no responde, encontrándose en estado de incosciencia.",
        "El paciente responde al díalogo, mostrándose confuso, escuchándose ruidos en la respiración."
      ],
      "attachment": null
    },

    "oxygenate":{
      
      "messages":[
        "Se coloca una mascarilla con oxígeno."
      ],
      "attachment": null
    },

    "collarin":{
      
      "messages":[
        "Se coloca un collarín cervical."
      ],
      "attachment": null
    },

    "cristaloides":{
      
      "messages":[
        "Se han sumistrado cristaloides por vía sanguínea."
      ],
      "attachment": null
    },

    "manta":{
      
      "messages":[
        "Se coloca una manta térmica para subir la temperatura al paciente."
      ],
      "attachment": null
    },

    "liquids":{
      
      "messages":[
        "Se han suministrado líquidos calientes para subir la temperatura del paciente."
      ],
      "attachment": null
    },
    
    "belt":{
      
      "messages":[
        "Se coloca un cinturón pélvico."
      ],
      "attachment": null
    },

    "glasgow":{
      
      "messages":[
        "Tras las pruebas realizadas el paciente, el nivel de conciencia se representa con un 10 en la escala de Glasgow"
        
      ],
      "attachment": null
    },

    "rx":{
      
      "messages":[
        "Ya se encuentran disponibles los resultados de la radiografía."
        
      ],
      "attachment": null
    },

    "eco":{
      
      "messages":[
        "Ya se encuentran disponibles los resultados de la ecografía."
        
      ],
      "attachment": null
    },

    "tac":{
      
      "messages":[
        "Ya se encuentran disponibles los resultados de la tomografía."
        
      ],
      "attachment": null
    },

    "analisis":{
      
      "messages":[
        "Ya se encuentran disponibles los resultados del análisis sanguíneo."
        
      ],
      "attachment": null
    },

    "transfusion":{
      
      "messages":[
        "Se realiza una transfusión al paciente para aumentar los niveles sanguíneos."
        
      ],
      "attachment": null
    },

    "surgery":{
      
      "messages":[
        "Se intervendrá quirurgicamente para fijar definivamente la pelvis."
        
      ],
      "attachment": null
    }
    
}

let actions = JSON.parse(JSON.stringify(actionsJson)) //usar fetch()


controller.get = async (req, res) => {
    
    const { action } = req.params;
        
    let act
    for( const prop in actions) {
        if (action === prop){
            act = prop
        
        }
    }
    data = actions[act]
    //const data = actions[act]

    res.json({success : true, data : data});
  
}

module.exports = controller;