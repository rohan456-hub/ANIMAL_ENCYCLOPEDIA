const router=require('express').Router()
const controller=require('./controller')
const upload=require('./middleware/upload')

router.get('/getAnimal',controller.getAnimal);
router.get('/getAnimalcategory',(upload.single('file')),controller.getAnimalcategory)
router.get('/getAnimalcategorylimit',(upload.single('file')),controller.getAnimalcategorylimit)
router.post('/getAnimalbycate',controller.getAnimalbycate)
router.post('/AddAnimals', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'audio', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'gallery', maxCount: Infinity}]), controller.AddAnimals);
router.post('/AddAnimalcategory',(upload.single('file')),controller.AddAnimalcategory)
router.post('/getAnimalbyID',(upload.fields([{name:'file'},{name:'audio'}])),controller.getAnimalbyID  )
router.post('/getAnimalSearch',controller.getAnimalSearch)
router.post('/Adduserdetail',controller.Adduserdetail  )
router.post('/getUser',controller.getUser)
router.post("/AddPets",upload.fields([{ name: "file" }, { name: "video" }]),controller.AddPets)
router.get("/getcat",controller.getcat)
router.get("/getdog",controller.getdog)
router.post('/getPetbyID',(upload.fields([{name:'file'},{name:'video'}])),controller.getPetbyID)
router.get('/getAnimalbyextinct',controller.getAnimalbyextinct)
router.post('/getAnimalextinctbyID',upload.fields([{ name: 'file', maxCount: 1 }, { name: 'audio', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'gallery', maxCount: Infinity}]),controller.getAnimalextinctbyID)
router.get('/getAnimalByFirstChar',controller.getAnimalByFirstChar)
router.post('/getNotification',controller.getNotification)
router.patch('/patchUserNotification/:id',controller.patchUserNotification)
router.get('/getSearch',controller.getSearch)
router.post('/AddMessage',controller.AddMessage)
router.post('/getnumbernoti',controller.getnumbernoti)
router.post('/getAnimalnumber',controller.getAnimalnumber)
// router.get('/getAnimalbySearch',(upload.fields([{name:'file'},{name:'audio'}])),controller.getAnimalbySearch)




module.exports=router   
