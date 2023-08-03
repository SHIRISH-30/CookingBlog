const express=require("express");
const router=express.Router();
const reciepeControllers=require("../controllers/reciepeController");



//app Routes
router.get("/",reciepeControllers.homepage);
router.get("/categories",reciepeControllers.exploreCategories);
router.get("/categories/:id",reciepeControllers.exploreCategoriesbyId)

router.post("/search",reciepeControllers.searchItem)
router.get("/recipe/:id",reciepeControllers.exploreReciepe);
router.get("/explore-latest",reciepeControllers.explorelatest);
router.get("/explore-random",reciepeControllers.explorerandom);
router.get("/submit-reciepe",reciepeControllers.submitreciepeform);
router.post("/submit-reciepe",reciepeControllers.submitReciepeByPost)
//export because it is used in app.js
module.exports=router;
