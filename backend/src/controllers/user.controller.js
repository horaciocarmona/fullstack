import { findUsers,findUserById, updateUserById } from "../services/UserServices.js";

export const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)

    } catch (error) {
        res.status(500).send(error)
    }

}
// import  {ManagerUserMongoDB}  from "../dao/MongoDB/models/User.js";
// export const managerUser =  new ManagerUserMongoDB()

// export  const createUser = async (req, res) => {
//     console.log('entra al createruser')
//     res.status(200).send({status:'success', message:'User created'})
//     // res.redirect("/api/session/login")

// //         try {
// //          console.log('createuser')
// //          const { first_name, last_name, email, age, password } = req.body
// //          if (email) {
// //              console.log('getmanagerusers',await managerUser.getElementByEmail())
// //              const user = await managerUser.getElementByEmail(email)
// //              console.log('getelementbyemail',user,email)
// //              if (user) {
// // //                 req.session.login=true                
// // //                 req.session.user=user    
// // //                 res.redirect("/api/session/login")
// //              } else {
// //                  const passwordHash=createHash(password)
// //                  console.log(passwordHash)
// //                  const userCreated=await managerUser.addElements([{ first_name:first_name, last_name:last_name, email:email, age:age, password:passwordHash}])
// // //                 req.session.login=true                
// // //                 req.session.user={
// // //                     first_name:first_name,
// // //                     last_name:last_name,
// // //                     email:email,
// // //                     age:age,
// // //                     password:passwordHash
// // //                 }    
// // //                 res.redirect("/api/session/login")
// //              }
// //          } else {
// //              return res.status(200).send({
// //                  message: "debe registarse"
// //                    })
// //          }
// //      } catch (error) {
// //          res.status(500).send({
// //              message: error.message
// //          })
// //      }
// }

 export const getUserById = async (req, res) => {
     const { id } = req.params
   
     try {
        const user = await findUserById(id);
        if (user) {
            return res.status(200).json(user)
        }

        return res.status(200).json({
            message: "Usuario no encontrado"
        })
            
     } catch (error) {
        return res.status(500).json({
            message: error.message
        })
      }
 }

 export const postDocumentsById = async (req, res) => {
    const { uid } = req.params
    if (!req.files) {
        return res.status(400).send('No se seleccionó ningún archivo.');
    }
    let documentos=[]
    req.files.forEach(file => { 
        // console.log('Nombre del archivo:', file.originalname);
        // console.log('Nombre del archivo en el servidor:', file.filename);
        // console.log('Tipo de archivo:', file.mimetype);
        // console.log('Tamaño del archivo:', file.size);
        // console.log('Ruta del archivo:', file.path);
        documentos.push({name:file.filename,reference:file.path})
    }) 
    try {
       const userBDD = await findUserById(uid);
       if (userBDD instanceof Error) {
           req.logger.error(`Error en la coneccion a al base de datos ${userBDD}`);
           return res.status(400).json({
              message: "Error en coneccion a BDD: "+userBDD,
           });
       } else {
           if (userBDD) {
//                console.log('documents',documentos)
//                console.log('userbdd',userBDD)
                const userdate = await updateUserById(uid,
                    {first_name:userBDD.first_name,
                     last_name:userBDD.last_name,
                     email:userBDD.email,
                     age:userBDD.age,
                     documents:documentos   
                    }
                )  
  //              console.log('userdate',userdate)

                return res.status(200).json({message:"Imagen cargada"})
            }
            return res.status(200).json({
                 message: "Usuario no encontrado"
            })
        }
    } catch (error) {
       return res.status(500).json({
           message: error.message
       })
     }
}

 // export const getUserByEmail = async (email) => {
        
//     try {
//         console.log('manageruser')
//         const user = await managerUser.getElementByEmail(email)
//         if (user) {
//             return user
//         }
//         return 'usuario no encontrado' 
//      } catch (error) {
//         return error
//     }
// }


