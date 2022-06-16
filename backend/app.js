const express = require('express')
const cors = require('cors')

const {sequelize, User, UFriend,Expense,ExpenseMember,Group,GroupMember,ActivityRecord} = require('./models')
const ufriend = require('./models/ufriend')


const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const app = express()
app.use(cors())
app.use(express.json())
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use(jsonParser);

//const twilio = require('twilio')

const accountSid = "ACe17fa45b7f06ed871a3684cba76b76e7";
const authToken = "f9c7ef220293925b6a0d242ea49a95ce";
const client = require('twilio')(accountSid, authToken);
const serviceId = 'VAfef16cf9b0334baead4d36320020a6d1';

//Signup users data added to Users table
app.post('/signup', async(req,res)=>{
    const hashPassword=bcrypt.hashSync(req.body.password,5);
    const data=
     {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      phno : req.body.phno,
      password:hashPassword
    }

    console.log("data",data)

    try{ 
        const user=await User.create(data)

        return res.json({user:user,message:"success"})
      }
    catch(err)
    {
        return  res.status(500).json(err)
    }
})


//Login users check with reg users through their mail-ids
app.post("/login" ,async(req,res)=>{
    try{
        const user=await User.findOne({
            where: 
            {
              email:req.body.email, 
            }
          })

          if(!user)
          {
              res.json({message:'Not a valid user'})
          }

          else
          {
              let userpassword=user.dataValues.password;

              const isUserPassword = bcrypt.compareSync(req.body.password,userpassword);

              if(isUserPassword)
              {

                  //res.send({token:token,msg:"success",email:req.body.email,id:user.id})
                  client.verify.services(serviceId)
                  .verifications
                  .create({to: '+91' + user.dataValues.phno, channel: 'sms'})
                  .then(data => 
                     {
                        return res.status(200).json({message : "success",data});
                     })
                     .catch((err)=>res.send(err))
              }

              else
              {
                  res.json({message:"Invalid Password"})
              }
        }
    }
    catch
    {
        res.status(500).json({message:"Error occurred user not found"})
    }
})

app.post('/otpverification',async(req,res)=>
{
    try
    {
        const user = await User.findOne({
            where :
            {
                email : req.body.email,
            }
        })
        if(!user)
        {
            res.json({message : 'User not found'})
        }
        else
        {
            const data = {email:req.body.email,password:req.body.password};
                  
            const token=jwt.sign(data,"Itsmy_secret_token")

            client.verify.services(serviceId)
            .verificationChecks
            .create({to: '+91' + user.dataValues.phno, 
            code: req.body.otp })
            .then(dataa => 
                {
                    if(dataa.valid)
                    {
                        res.json({token : token,msg : "Success", email : req.body.email,id : user.id,username : user.firstname,otpres : dataa})
                    }
                    else
                    {
                        res.json({message : "Unsuccess"})
                    }
                })
                .catch((err)=>
                {
                    return res.status(400).json({err})
                })
        }
    }
    catch(err)
    {
        res.status(500).send({message : err})
    }
})

app.get('/users',async(req,res) =>
{
    try{
        const users = await User.findAll({include : [UFriend]})

        return res.json({users,message : "success"})
    }
    catch(err)
    {
        console.log(err)
        return res.json({message:err})
    }
})

app.get('/users/:id',async(req,res) =>
{
    const id = req.params.id
    try{
        const user = await User.findOne({
            where : {id},
            include : [UFriend]
        })

        return res.json(user)
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({error : 'Something went wrong'})
    }
})


//check existing user mail to reset password 
app.post('/usertest',async(req,res)=>{
    try{   
          const user=await User.findOne({
            where: {
              email:req.body.email, 
            }
          })

          if(!user)
          {      
                 res.json({message:"User not found"})
          }
          else
          {
             res.status(200).json({email:req.body.email,message:"success"})
          }
    }
    catch(err){
           res.status(404).json({message:err})
    }
})


//password reset route call
app.post('/resetpassword',async(req,res)=>
{
    const hashpassword=bcrypt.hashSync(req.body.password,5)
     try{
        const emailuser= User.update({password:hashpassword},{where:{email:req.body.email}})
        console.log(emailuser)
        res.json({message:"success",emailuser:emailuser})
     }
     catch(err)
     {
        res.json({message:err})
     }
 })


//search and filter
app.get("/search/:key",async(req,res)=>
{
    // let result = await User.findOne({
    //     "$or" :[
    //         { where : {name : {$regex : req.params.key}}}
    //     ]
    // })
    const result = await User.findOne({
        where : {firstname : req.params.key}
    })
    res.send(result)
})


//DELETE a particular user
app.delete('/users/:id',async(req,res) =>
{
    const id = req.params.id
    try{
        const user = await User.findOne({
            where : {id},
        })

        await user.destroy()

        return res.json({message : 'User deleted!!'})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({error : 'Something went wrong'})
    }
})


//UPDATE a particular user
app.put('/users/:id',async(req,res) =>
{
    const id = req.params.id
    //const {firstname,lastname,email} = req.body
    try{
        const user = await User.findOne({
            where : {id},
        })

        user.firstname = req.body.firstname,
        user.lastname = req.body.lastname,
        user.email = req.body.email

        await user.save()

        return res.json(user)
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({error : 'Something went wrong'})
    }
})


// app.post('/ufriendpost/:id',async(req,res)=>
// {
//     const id = req.params.id
//     const {body} = req.body;
//     try{
//         const user = await User.findOne({where : {id : id}})

//         const UF = await UFriend.create({body,UserId:user.id})

//         return res.json(UF)
//     }
//     catch(err)
//     {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })



//Example : 
// {
//     "F_id" : "1",
//     "uid" : "3"
// }
app.post('/ufriendpost',async(req,res)=>
{
    //const id = req.params.id
    const {F_id} = req.body;
    try{
        const user = await User.findOne({where : {id : req.body.uid}})

        const UF = await UFriend.create({F_id,UserId:user.id})

        return res.json(UF)
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/ufriends',async(req,res) =>
{
    try{
        const ufs = await UFriend.findAll({include : [User]})

        return res.json(ufs)
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({error : 'Something went wrong'})
    }
})

const tokenverification=require('./tokenverification');
const db = require('./models');


app.post("/addfriend",tokenverification,async(req,res)=>{
    console.log("call")
    const {user_mail,mail,createdby}=req.body;
    try{
         const user = await User.findOne({where:{email:user_mail}})

         const friend = await User.findOne({where : {email:mail}})
        // console.log("user",user)
        const frnd = await UFriend.create({fid:friend.id,userid:user.id})
        const activity = {
            taskname : "Added a New Friend",
            date : new Date(),
            createdby : createdby
        }
       const resultt = ActivityRecord.create(activity);
       console.log(resultt,"activity record")
        return res.json({message:"success",frnd : frnd})
    }
    catch(err)
    {
        return res.status(500).json(err)
    }
})

//send friendslist to frontend
app.get("/friends/:id",tokenverification,async(req,res)=>{
    console.log(req.params,"params")
    try{        
                  console.log("params",req.params.id);
                 db.sequelize.query(`select u.id,u.firstname,u.lastname,u.email from users u,ufriends uf where (uf.fid=u.id and uf.userid=${req.params.id}) `)
                  
    
                //  db.sequelize.query(`select UFriend.id FROM UFriend WHERE UserId=${req.params.id}`,{
                //      type : QueryTypes.SELECT,
                //     model: UFriend,
                //     mapToModel: true // pass true here if you have any mapped fields
                //   })
                //  const ufs = await UFriend.findAll({
                //      where :
                //      {
                //          UserId : 1
                //      }
                //  })
                  .then((data)=>res.send(data))
                  .catch((err)=>res.send(err))                  
    }
    catch(err)
    {
        return res.status(500).json(err)
    }
    })

app.post("/addexpense",tokenverification,async(req,res)=>{
        try{
            const data={
                createdby:req.body.createdby,
                amount:req.body.amount,
                description:req.body.description
            }
            //console.log(data,"response data")
        
          const expense=await Expense.create(data)
           // console.log(expense)
            if(!expense)
            {
                  return res.json({message:"unsuccess"})   
            }
            else
            {
                   var div_amount=Math.floor(req.body.amount/req.body.members.length)
                  // console.log(div_amount)
                for(var i=0;i<req.body.members.length;i++)
                {
                    var expensememdata={
                        expenseid:expense.id,
                        memberid:req.body.members[i],
                        divamount:div_amount
                    }
                  var exmem=ExpenseMember.create(expensememdata)
                }
                const activity = {
                    taskname : "Expense added successfully - friends",
                    date : new Date(),
                    createdby : req.body.createdby
                }
               const resultt = ActivityRecord.create(activity);
               console.log(resultt,"activity record")
                return res.json({message:"success",exmem : exmem})
            }     
        }     
        catch(err)
        {
            return res.status(500).json(err)
        }
})


app.get('/userspends/:id',async(req,res)=>{
    try{
        const data=[];
       
        //data = db.sequelize.query(`select e.id,e.description,e.amount from users u,expenses e where (u.id=e.createdby)`)
        // console.log(data,"user spends ");

       db.sequelize.query(`select * from expenses where (expenses.createdby=${req.params.id}) `)
       .then((result)=>res.send(result))
       .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})

//get user data who owe expenses to logged user
app.get('/getuserdata/:id/:expid',async(req,res)=>
{
    try
    {
        const {expid,id} = req.params;
        db.sequelize.query(`select u.firstname,k.firstname as investedby,k.divamount,k.amount as totalamount,k.description from users u
         inner join (select u.firstname,e.description,em.divamount,e.amount,em.memberid as owed from users u inner join 
            expenses e on u.id=e.createdby inner join expensemembers em on e.id=em.expenseid and e.id=${req.params.expid})k on u.id=k.owed;`)
        .then((data) => {
            console.log(data,"response")
            res.json(data)
        })
        .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})



app.post("/creategroup",tokenverification,async(req,res)=>{
    try{
        const data={
            createdby:req.body.createdby,
            grpname:req.body.grpname
        }
        console.log(data,"response data")
    
      const group=await Group.create(data)
       // console.log(expense)
        if(!group)
        {
              return res.json({message:"group creation unsuccessful"})   
        }
        else
        {
            for(var i=0;i<req.body.members.length;i++)
            {
                var grpdata={
                    grpid:group.id,
                    memberid:req.body.members[i],
                }
              var grpmem = GroupMember.create(grpdata)
            }
            const activity = {
                taskname : "Group creation done",
                date : new Date(),
                createdby : req.body.createdby
            }
           const resultt = ActivityRecord.create(activity);
           console.log(resultt,"activity record")
            return res.json({
                message:"successfully created group", grpmem: grpdata,
            })
        }     
    }     
    catch(err)
    {
        return res.status(500).json(err)
    }
})


app.get('/groupdetails/:id',async(req,res)=>{
    try{
       db.sequelize.query(`select * from groups where (groups.createdby=${req.params.id}) `)
       .then((result)=>res.send(result))
       .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})


//get user data who is in particular group
app.get('/getgrpmem/:id/:grpid',async(req,res)=>
{
    try
    {
        const {grpid,id} = req.params;
        console.log(grpid,"grp idddd")
        db.sequelize.query(`select distinct u.firstname,u.id from users u join (select gm.memberid from groupmembers gm,groups g where gm.grpid=${req.params.grpid})dd on u.id=dd.memberid`)
        .then((data) => {
            console.log(data,"response")
            res.json(data)
        })
        .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})


app.post("/addgrpexpense",tokenverification,async(req,res)=>{
    try{
        const data={
            createdby:req.body.createdby,
            amount:req.body.amount,
            description:req.body.description,
            grpid : req.body.grpid
        }
        //console.log(data,"response data")
    
      const expense=await Expense.create(data)
       // console.log(expense)
        if(!expense)
        {
              return res.json({message:"unsuccess"})   
        }
        else
        {
               var div_amount=Math.floor(req.body.amount/req.body.members.length)
              // console.log(div_amount)
            for(var i=0;i<req.body.members.length;i++)
            {
                var expensememdata={
                    expenseid:expense.id,
                    memberid:req.body.members[i],
                    divamount:div_amount,
                    grpid : req.body.grpid
                }
              var exmem=ExpenseMember.create(expensememdata)
            }
            const activity = {
                taskname : "Group expense created for group",
                date : new Date(),
                createdby : req.body.createdby
            }
           const resultt = ActivityRecord.create(activity);
           console.log(resultt,"activity record")
            return res.json({message:"success",exmem : exmem})
        }     
    }     
    catch(err)
    {
        return res.status(500).json(err)
    }
})


//transaction details
app.get('/transaction/:id/:expid',async(req,res)=>
{
    try
    {
        const {expid,id} = req.params;
        db.sequelize.query(`select u.firstname as owedperson,k.firstname as investedby,k.divamount,k.amount as totalamount,k.description,k.createdat,k.grpid from users u inner join (select u.firstname,e.description,em.divamount,e.amount,em.memberid as owed,e."createdAt" as createdat,em.grpid from users u inner join expenses e on u.id=e.createdby inner join expensemembers em on e.id=em.expenseid and e.id=${req.params.expid})k on u.id=k.owed;`)
        .then((data) => {
            console.log(data,"response")
            res.json(data)
        })
        .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})


app.get('/showactivity/:id',async(req,res)=>{
   // console.log("activity func called")
    try{
       db.sequelize.query(`select * from activityrecords where (activityrecords.createdby=${req.params.id}) `)
       .then((result)=>res.send(result))
       .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})

app.listen({port : 1000}, async() =>
{
    console.log("server running on http://localhost:1000")
    await sequelize.authenticate()
    console.log('Database Connected!!')
})


