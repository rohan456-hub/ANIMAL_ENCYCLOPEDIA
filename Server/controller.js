
const { Messagedetails, UserNoti, Petsdetails, Userdetails, Animalcategory, AnimalsSchema } = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.getAnimal = async (req, res) => {
  const query = { Status: { $eq: "Approved" } }
  //get all the data in the model and return it as response
  try {
    AnimalsSchema.find(query)
      .then((Animal) => {
        res.status(200)
          .json({
            success: true,
            Animal
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
exports.getAnimalcategory = async (req, res) => {
  const query = { Status: { $eq: "Approved" } }
  //get all the data in the model and return it as response
  try {

    if (req.file) {
      Animalcategory.file = req.file.path
    }
    Animalcategory.find(query)
      .then((Animal) => {
        res.status(200)
          .json({
            success: true,
            count: Animal.length,
            Animal
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
exports.getAnimalbycate = async (req, res) => {
  // const query={Status:{$eq:"Approved"}}
  //get all the data in the model and return it as response
  try {
    console.log(req)
    const query = { Categoryname: { $eq: req.body.Categoryname }, Status: { $eq: "Approved" } };
    //  const query2={Status:{$eq:"Approved"}}
    AnimalsSchema.find(query)
      .then((Animal) => {
        res.status(200)
          .json({
            success: true,
            Animal
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
exports.AddAnimals = async (req, res) => {

  console.log(req.file)
  const Animal = new AnimalsSchema(req.body)
  //get all the data in the model and return it as response
  try {
    if (req.files.file) {
      Animal.file = req.files.file[0].path;
    }
    if (req.files.audio) {
      Animal.Audiofile = req.files.audio[0].path;
    }
    if (req.files.video) {
      Animal.Videofile = req.files.video[0].path;
    }
    if (req.files.gallery) {
      Animal.Gallery = req.files.gallery.map(file => file.path);[]
    }
    const ani = await Animal.save()
    // ArticleSchema.find()
    //   .then((Articles) => {
    if (ani.id !== "") {
      return res.status(200)
        .json({
          success: true,
          Animal
        })
    } else {
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
exports.AddAnimalcategory = async (req, res) => {
  console.log(req.file)
  const Animal = new Animalcategory(req.body)
  //get all the data in the model and return it as response
  try {
    if (req.file) {
      Animal.file = req.file.path
    }
    const ani = await Animal.save()
    // ArticleSchema.find()
    //   .then((Articles) => {
    if (ani.id !== "") {
      return res.status(200)
        .json({
          success: true,
          Animal
        })
    } else {
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
exports.getAnimalbyID = async (req, res) => {
  // const query={Status:{$eq:"Approved"}}
  //get all the data in the model and return it as response

  try {
    console.log(req.file)
    const query = { _id: { $eq: req.body.id } };
    AnimalsSchema.find(query)
      .then((Animal) => {
        res.status(200)
          .json({
            success: true,
            Animal
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
exports.getAnimalcategorylimit = async (req, res) => {
  const query = { Status: { $eq: "Approved" } }
  //get all the data in the model and return it as response
  try {
    const limit = 6;
    if (req.file) {
      Animalcategory.file = req.file.path
    }
    Animalcategory.find(query).limit(limit)
      .then((Animal) => {
        res.status(200)
          .json({
            success: true,
            Animal
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
exports.getAnimalSearch = async (req, res) => {
  // const query={Status:{$eq:"Approved"}}
  //get all the data in the model and return it as response

  try {
    console.log(req.file)
    const query = { Name: { $eq: req.body.Name } };
    AnimalsSchema.find(query)
      .then((Animal) => {
        res.status(200)
          .json({
            success: true,
            Animal
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
exports.Adduserdetail = async (req, res) => {
  const existingUser = await Userdetails.findOne({ Email: req.body.Email });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(req.body.Password, 12);
  const User = new Userdetails({
    Username: req.body.Username,
    Email: req.body.Email,
    Password: passwordHash,
  })
  //get all the data in the model and return it as response
  try {
    const art = await User.save()
    // ArticleSchema.find()
    //   .then((Articles) => {
    if (art.id !== "") {
      return res.status(200)
        .json({
          success: true,
          User
        })
    } else {
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
exports.getUser = async (req, res) => {
  try {
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

    // Existing plaintext accounts are upgraded after their first successful login.
    if (!user.Password.startsWith('$2')) {
      user.Password = await bcrypt.hash(req.body.Password, 12);
      user.ConfirmPassword = undefined;
      await user.save();
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured.');
    }
    const token = jwt.sign({ id: user._id, email: user.Email, username: user.Username }, process.env.JWT_SECRET, { expiresIn: '8h' });
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
exports.AddPets = async (req, res) => {
  try {
    console.log(req.files); // Debugging: Log uploaded files

    // Create a new Pet instance using req.body
    const Pets = new Petsdetails(req.body);

    // Assign file paths if available
    if (req.files?.file?.[0]) {
      Pets.file = req.files.file[0].path;
    }
    if (req.files?.video?.[0]) {
      Pets.Videofile = req.files.video[0].path;
    }

    // Save to database
    const ani = await Pets.save();

    if (ani.id) {
      return res.status(200).json({
        success: true,
        Pets,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Could not save pet details",
      });
    }
  } catch (error) {
    console.error("Error in AddPets:", error); // Debugging: Log errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.getcat = async (req, res) => {
  const query = { Whichpet: { $eq: "Cat" }, Status: { $eq: "Approved" } }
  //get all the data in the model and return it as response
  try {
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
exports.getdog = async (req, res) => {
  const query = { Whichpet: { $eq: "Dog" }, Status: { $eq: "Approved" } }
  //get all the data in the model and return it as response
  try {
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
exports.getPetbyID = async (req, res) => {
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
exports.getAnimalbyextinct = async (req, res) => {
  // const query={Status:{$eq:"Approved"}}
  //get all the data in the model and return it as response
  try {
    console.log(req)
    const query = { Categoryname: { $eq: "Ancient Animals" }, Status: { $eq: "Approved" } };
    //  const query2={Status:{$eq:"Approved"}}
    AnimalsSchema.find(query)
      .then((Animal) => {
        res.status(200)
          .json({
            success: true,
            Animal
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
exports.getAnimalextinctbyID = async (req, res) => {
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
exports.getAnimalByFirstChar = async (req, res) => {
  try {
    const { firstChar } = req.query;

    if (!firstChar || firstChar.length !== 1) {
      return res.status(400).json({
        success: false,
        message: "Please provide a single character to search."
      });
    }

    const regexPattern = new RegExp("^" + firstChar, "i"); // Case-insensitive regex for matching names
    const query = {
      Status: { $eq: "Approved" },
      Name: { $regex: regexPattern } // Assumes 'Name' is the field storing animal names
    };

    const animals = await AnimalsSchema.find(query);

    if (animals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No animals found with the given starting character."
      });
    }

    res.status(200).json({
      success: true,
      animals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
// exports.getSearch = async (req, res) => {
//   try {
//     const { Name } = req.query;

//     if (!Name || Name.length < 2) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter at least two characters to search."
//       });
//     }

//     const regexPattern = new RegExp(Name, "i"); // Case-insensitive search
//     const query = {
//       Status: "Approved",
//       Name: { $regex: regexPattern }
//     };

//     const animals = await AnimalsSchema.find(query);

//     res.status(200).json({
//       success: true,
//       count: animals.length,
//       animals
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message
//     });
//   }
// };

exports.getAnimalbySearch = async (req, res) => {
  // const query={Status:{$eq:"Approved"}}
  //get all the data in the model and return it as response

  try {
    console.log(req.file)
    const query = { Name: { $eq: req.body.Name } };
    AnimalsSchema.find(query)
      .then((Animal) => {
        res.status(200)
          .json({
            success: true,
            Animal
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
exports.getNotification = async (req, res) => {
  // cosnt body=req.body
  //get all the data in the model and return it as response
  try {
    console.log(req);
    const query = { Username: { $eq: req.body.Username } }
    UserNoti.find(query)
      .then((usernotification) => {
        res.status(200)
          .json({
            success: true,
            usernotification
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
exports.patchUserNotification = async (req, res) => {

  const updatenotification = await UserNoti.findByIdAndUpdate(req.params.id, req.body)
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        updatenotification
      }
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getSearch = async (req, res) => {
  try {
    const { Name } = req.query;

    if (!Name || Name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least two characters for search.",
      });
    }

    const regexPattern = new RegExp(Name, "i"); // Case-insensitive search
    const animals = await AnimalsSchema.find({ Name: { $regex: regexPattern }, Status: "Approved" });

    if (animals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching animals found.",
      });
    }

    res.status(200).json({ success: true, animals });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}
exports.AddMessage = async (req, res) => {
  const Mess = new Messagedetails(req.body)
  //get all the data in the model and return it as response
  try {
    const art = await Mess.save()
    // ArticleSchema.find()
    //   .then((Articles) => {
    if (art.id !== "") {
      return res.status(200)
        .json({
          success: true,
          Mess
        })
    } else {
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
exports.getnumbernoti = async (req, res) => {
  try {
    const { Username } = req.body;

    if (!Username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const unreadCount = await UserNoti.countDocuments({
      Username,
      IsRead: "false"
    });

    res.status(200).json({ count: unreadCount });
  } catch (err) {
    console.error("Error in getnumbernoti:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAnimalnumber = async (req, res) => {
  try {
    const {Categoryname} = req.body;

    if (!Categoryname) {
      return res.status(400).json({ message: "Categoryname is required" });
    }

    const unreadCount = await AnimalsSchema.countDocuments({
      Categoryname,
      Status: "Approved"
    
    });

    res.status(200).json({ count: unreadCount });
  } catch (err) {
    console.error("Error in getnumbernoti:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports = router;
