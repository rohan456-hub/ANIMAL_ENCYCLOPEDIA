const mongoose = require("mongoose");
const {Schema,model}=require('mongoose')

const AnimalSchema= new Schema({
Name:{type:String},
PopulationSize:{type:String},
LifeSpan:{type:String},
Topspeed:{type:String},
Weight:{type:String},
Length:{type:String},
ShortDescription:{type:String},
Appearance:{type:String},
HabitsandLifestyle:{type:String},
DietandNutrition:{type:String},
MatingHabits:{type:String},
Population:{type:String},
Categoryname:{type:String},
file:{type:String},
Gallery:[{type:String}],
Audiofile:{type:String},
Videofile:{type:String},
Status:{type:String},
Username:{type:String}
},{
    collection:"Animalcollections"
}
);

const AnimalsSchema = model('Animaldb',AnimalSchema)


const CategorySchema= new mongoose.Schema({
    Categoryname:{type:String},
    file:{type:String},
    Status:{type:String}

},{
    collection:"Animalcategory"
}
);

const Animalcategory= model('Animalcat',CategorySchema)


const UserSchema=new mongoose.Schema({
    Username:{type:String},
    Email:{type:String},
    Password:{type:String},
    ConfirmPassword:{type:String},
},{
    collection:"Userinfo"
})

const Userdetails= model('User',UserSchema)

const PetsSchema=new mongoose.Schema({
    PetName:{type:String},
    Description:{type:String},
    Appearance:{type:String},
    Origion:{type:String},
    Height:{type:String},
    Weight:{type:String},
    Lifespan:{type:String},
    Temperament:{type:String},
    Training:{type:String},
    Interestingfacts:{type:String},
    Whichpet:{type:String},
    file:{type:String},
    Videofile:{type:String},
    Status:{type:String},
    Username:{type:String}
},{
    collection:"Petscollections"
})

const Petsdetails= model('pets',PetsSchema)


const UserNotification= new mongoose.Schema({
    Username:{type:String},
    Name:{type:String},
    ShortDescription:{type:String},
    IsRead:{type:String},
    Status:{type:String},
  },{
    collection:'Notification'
  })

  const UserNoti=model('Noti',UserNotification)

  const MessageSchema=new mongoose.Schema({
    UserName:{type:String},
    Email:{type:String},
    Message:{type:String},
},{
    collection:"Message"
})

const Messagedetails= model('mess',MessageSchema)


module.exports={Messagedetails,UserNoti,Petsdetails,Userdetails,Animalcategory,AnimalsSchema}