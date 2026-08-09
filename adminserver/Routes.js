const router=require('express').Router()
const controller=require('./controller')
const upload=require('./middleware/upload')
const requireAdmin=require('./middleware/auth')

// Login remains public; every management endpoint below requires an admin token.
router.post('/getUser',controller.getUser)
router.use(requireAdmin)

router.post('/getAnimal',controller.getAnimal)
router.post('/getAnimalbyID',(upload.fields([{name:'file'},{name:'audio'}])),controller.getAnimalbyID  )
router.patch('/patchAnimals/:_id',controller.patchAnimals)
router.post('/getAnimalCategory',(upload.single('file')),controller.getAnimalCategory)
router.patch('/patchAnimalCategory/:_id',controller.patchAnimalCategory)
router.post('/getAnimalCategorybyID',(upload.single('file')),controller.getAnimalCategorybyID)
router.post('/getuserdetail',controller.getuserdetail)
// router.post('/AddAdmindetails',controller.AddAdmindetails)
router.post("/getpetdata",controller.getpetdata)
router.patch('/patchpets/:_id',controller.patchpets)
router.post('/getpetsbyID',(upload.fields([{name:'file'},{name:'video'}])),controller.getpetsbyID)
router.post('/postusernotification',controller.postusernotification)
router.post('/getMessagedetails',controller.getMessagedetails)

module.exports=router
