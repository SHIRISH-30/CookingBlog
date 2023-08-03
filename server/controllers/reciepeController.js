require("../models/database.js")
const Category=require("../models/Category");
const Reciepe = require("../models/Reciepe.js");

//get router ->homepage->index.ejs
module.exports.homepage=async(req,res)=>{
   try {
    //5 category chhauye kaali
    const limitNumber=5;
    //find the categories from the db
    const categories=await Category.find({}).limit(limitNumber);
  //find reciepes from db
    const latest=await Reciepe.find({}).sort({_id:-1}).limit(limitNumber);
    //thai food
    const thai=await Reciepe.find({"category":"Thai"}).limit(limitNumber);
    //mexican food
    const mexican=await Reciepe.find({"category":"Mexican"}).limit(limitNumber);
    const american=await Reciepe.find({"category":"American"}).limit(limitNumber);
    const chinese=await Reciepe.find({"category":"Chinese"}).limit(limitNumber);
    const food={latest,thai,mexican,chinese,american};
    res.render("index",{title:'HomePage',categories,food});
   } catch (error) {
   res.status(500).send({message:error.message||'error occured'});
   }
}

module.exports.exploreCategories=async(req,res)=>{
    try {
     //5 category chhauye kaali
     const limitNumber=5;
     //find the categories from the db
     const categories=await Category.find({}).limit(limitNumber);
     res.render("categories",{title:'Cooking blog-View All',categories});
    } catch (error) {
    res.status(500).send({message:error.message||'error occured'});
    }
 }
module.exports.exploreReciepe=async(req,res)=>{
    try {
    const reciepeId=req.params.id;
    const reciepe=await Reciepe.findById(reciepeId);
     res.render("reciepe.ejs",{title:'Cooking blog-View All',reciepe});
    } catch (error) {
    res.status(500).send({message:error.message||'error occured'});
    }
 }

 module.exports.exploreCategoriesbyId=async(req,res)=>{
   try {

   const categoryId=req.params.id;
    //5 category chhauye kaali
    const limitNumber=5;
    //find the categories from the db
    const categoryById=await Reciepe.find({"category":categoryId}).limit(limitNumber);
    res.render("categories",{title:'Cooking blog-View All',categoryById});
   } catch (error) {
   res.status(500).send({message:error.message||'error occured'});
   }
}

module.exports.searchItem=async(req,res)=>{
   try {
      const searchterm=req.body.searchTerm;
      let reciepe=await Reciepe.find({$text:{$search:searchterm,$diacriticSensitive:true}})
      res.render("search",{title:'Cooking blog-Search',reciepe});
   } catch (error) {
      res.status(500).send({message:error.message||'error occured'});
   }
}


 module.exports.explorelatest=async(req,res)=>{
   const limitNumber=20;
   const reciepe=await Reciepe.find({}).sort({_id:-1}).limit(limitNumber);
   res.render("explore-latest",{title:'Cooking blog-Explore Latest',reciepe});
 }

 module.exports.explorerandom=async(req,res)=>{
   try {
      let count = await Reciepe.find().countDocuments();
      let random = Math.floor(Math.random() * count);
      let reciepe = await Reciepe.findOne().skip(random).exec();
      res.render('explore-random', { title: 'Cooking Blog - Explore Random', reciepe } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  } 
 
module.exports.submitreciepeform=async(req,res)=>{
   const infoErrorsObj = req.flash('infoErrors');
   const infoSubmitObj = req.flash('infoSubmit');
   res.render("submit-reciepe",{title:'Cooking blog-Submit Reciepe',infoErrorsObj,infoSubmitObj});
}

module.exports.submitReciepeByPost=async(req,res)=>{
try {
   let imageUploadFile;
   let uploadPath;
   let newImageName;

   if(!req.files || Object.keys(req.files).length === 0){
     console.log('No Files where uploaded.');
   } else {

     imageUploadFile = req.files.image;
     newImageName = Date.now() + imageUploadFile.name;

     uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;

     imageUploadFile.mv(uploadPath, function(err){
       if(err) return res.satus(500).send(err);
     })

   }

   const newReciepe = new Reciepe({
     name: req.body.name,
     description: req.body.description,
     email: req.body.email,
     ingredients: req.body.ingredients,
     category: req.body.category,
     image: newImageName
   });
   
   await newReciepe.save();

   req.flash('infoSubmit', 'Recipe has been added.');
   res.redirect("submit-reciepe");
} catch (error) {
   req.flash('infoErrors', error);
   res.redirect('/submit-recipe');
 }
}

