const validateEditAllowed = (req)=>{
const allowedFields = ["name", "gender", "age"];
const isEditAllowed = Object.keys(req.body).every((i)=>allowedFields.includes(i));
return isEditAllowed;
}