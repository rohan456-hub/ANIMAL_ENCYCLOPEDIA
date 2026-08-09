const { Messagedetails,UserNoti,Petsdetails, Admindetails, Userdetails, AnimalsSchema, Animalcategory } = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAnimal = async (req, res) => {
  const query = { Status: { $eq: req.body.Status } }
  //get all the data in the model and return it as response
  try {
    AnimalsSchema.find(query)
      .then((Animals) => {
        res.status(200)
          .json({
            success: true,
            Animals
          })
      })
      .catch((error) => {
        res.status(404)
          .json({
            success: false,
            message: "Cant fined ",
            error
          })
      })
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
exports.getAnimalbyID = async (req, res) => {
  // const query={Status:{$eq:"Approved"}}
  //get all the data in the model and return it as response

  try {
    console.log(req.file)
    const query = { _id: { $eq: req.body.id } };
    AnimalsSchema.find(query)
      .then((Animals) => {
        res.status(200)
          .json({
            success: true,
            Animals
          })
      })
      .catch((error) => {
        res.status(404)
          .json({
            success: false,
            message: "Cant fined ",
            error
          })
      })
  }
  catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
exports.patchAnimals = async (req, res) => {
  const updateAnimal = await AnimalsSchema.findByIdAndUpdate(req.params._id, req.body)
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        updateAnimal
      }
    })
  } catch (err) {
    console.log(err)
  }
}
exports.getAnimalCategory = async (req, res) => {
  const query = { Status: { $eq: req.body.Status } }
  //get all the data in the model and return it as response
  try {
    Animalcategory.find(query)
      .then((Animals) => {
        res.status(200)
          .json({
            success: true,
            Animals
          })
      })
      .catch((error) => {
        res.status(404)
          .json({
            success: false,
            message: "Cant fined ",
            error
          })
      })
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
exports.patchAnimalCategory = async (req, res) => {
  const updateAnimal = await Animalcategory.findByIdAndUpdate(req.params._id, req.body)
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        updateAnimal
      }
    })
  } catch (err) {
    console.log(err)
  }
}
exports.getAnimalCategorybyID = async (req, res) => {
  // const query={Status:{$eq:"Approved"}}
  //get all the data in the model and return it as response

  try {
    console.log(req.file)
    const query = { _id: { $eq: req.body.id } };
    Animalcategory.find(query)
      .then((Animals) => {
        res.status(200)
          .json({
            success: true,
            Animals
          })
      })
      .catch((error) => {
        res.status(404)
          .json({
            success: false,
            message: "Cant fined ",
            error
          })
      })
  }
  catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
exports.getuserdetail = async (req, res) => {
  // const query={Status:{$eq:req.body.Status}}
  //get all the data in the model and return it as response
  try {
    Userdetails.find()
      .then((User) => {
        res.status(200)
          .json({
            success: true,
            User
          })
      })
      .catch((error) => {
        res.status(404)
          .json({
            success: false,
            message: "Cant fined ",
            error
          })
      })
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
// exports.AddAdmindetails= async (req, res) => {
//   const Admin=new Admindetails(req.body)
//   //get all the data in the model and return it as response
//   try {
//     const art=await Admin.save()
//     // ArticleSchema.find()
//     //   .then((Articles) => {
//       if(art.id!==""){
//         return res.status(200)
//           .json({
//             success: true,
//             Admin
//           })
//         }else{
//             res.status(404)
//               .json({
//                 success: false,
//                 message: "Cant fined ",
//                 error
//               })
//         }
//       // })

//   } catch (error) {
//     res.status(500)
//       .json({
//         success: false,
//         message: "Internal server error",
//         error: error.message
//       })
//   }
// }
exports.getUser = async (req, res) => {
  try {
    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',').map((email) => email.trim().toLowerCase()).filter(Boolean);
    const email = req.body.Email?.toLowerCase();
    if (!adminEmails.includes(email)) {
      return res.status(403).json({ success: false, message: 'Administrator access is required.' });
    }

    const user = await Userdetails.findOne({ Email: req.body.Email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const validPassword = user.Password?.startsWith('$2')
      ? await bcrypt.compare(req.body.Password, user.Password)
      : req.body.Password === user.Password;
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.Password.startsWith('$2')) {
      user.Password = await bcrypt.hash(req.body.Password, 12);
      user.ConfirmPassword = undefined;
      await user.save();
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured.');
    }
    const token = jwt.sign({ id: user._id, email: user.Email, username: user.Username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
    const safeUser = { id: user._id, Username: user.Username, Email: user.Email };
    return res.status(200).json({ success: true, userdetails: [safeUser], token });
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
exports.getpetdata = async (req, res) => {
  try {
    // Validate request body to prevent undefined errors
    if (!req.body.Status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const query = { Status: req.body.Status }; // Ensure case matches DB field

    const Pets = await Petsdetails.find(query);

    if (!Pets.length) {
      return res.status(404).json({
        success: false,
        message: "No pets found with the given status"
      });
    }

    res.status(200).json({
      success: true,
      Pets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
exports.patchpets = async (req, res) => {
  const updatepets= await Petsdetails.findByIdAndUpdate(req.params._id, req.body)
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        updatepets
      }
    })
  } catch (err) {
    console.log(err)
  }
}
exports.getpetsbyID= async (req, res) => {
  // const query={Status:{$eq:"Approved"}}
  //get all the data in the model and return it as response

  try {
    console.log(req.file)
    const query = { _id: { $eq: req.body.id } };
    Petsdetails.find(query)
      .then((Pets) => {
        res.status(200)
          .json({
            success: true,
            Pets
          })
      })
      .catch((error) => {
        res.status(404)
          .json({
            success: false,
            message: "Cant fined ",
            error
          })
      })
  }
  catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
exports.postusernotification= async (req, res) => {   
  const UserNotidata=new UserNoti(req.body)
  //get all the data in the model and return it as response
  try {
    const art=await UserNotidata.save()
    // ArticleSchema.find()
    //   .then((Articles) => {
      if(art.id!==""){
        return res.status(200)
          .json({
            success: true,
            UserNotidata
          })
        }else{
            res.status(404)
              .json({
                success: false,
                message: "Cant fined ",
                error
              })
        }
      // })
      
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
exports.getMessagedetails = async (req, res) => {
  // const query={Status:{$eq:req.body.Status}}
  //get all the data in the model and return it as response
  try {
    Messagedetails.find()
      .then((Mess) => {
        res.status(200)
          .json({
            success: true,
            Mess
          })
      })
      .catch((error) => {
        res.status(404)
          .json({
            success: false,
            message: "Cant fined ",
            error
          })
      })
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message
      })
  }
}
