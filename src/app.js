const express = require('express')
const app = express()
const port = process.env.PORT || 80
require('./db/conn')
const User = require('./models/user')
const { json } = require('body-parser')
const bcrypt = require("bcryptjs")
const bodyparser=require('body-parser')
const path=require('path')

// app.use(express.static('assets'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

console.log(path.join(__dirname,'public'));
    app.use(express.static(path.join(__dirname,"public")))
// app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile((path.join(__dirname,'public/home.html')));
    // res.send('home.html must served here')
    // console.log((path.join(__dirname,'/home')));
    // console.log((path.join(__dirname,'../../public')));
 
   
    

})


// Sign Up Process
app.post('/Register', async (req, res) => {

    const { email } = req.body; // HTML "name" property will be set to email

    try {
        const FindEmail = await User.find({ email: email });

        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send('Email  Already Exist')


        else {
            if(req.body.password==req.body.confirmpass){
             //IF NO ERROR THAN REGISTER THE USER
                const RegUser = new User(req.body)
                const Saved = await RegUser.save()
                console.log(Saved)
                // res.send([Saved, 'USER REGISTERED'])
                res.sendFile((path.join(__dirname,'public/home.html')));
                
                console.log([Saved, 'USER REGISTERED'])

            }
            else{
                return res.send('Confirm password does not match Password')
            }

        }


    } catch (error) {
        res.send(error)
        console.log(error);
    }






}
)

// LOGIN SYSTEM 

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const useremail = await User.findOne({ email: email });

        const ismatch = await bcrypt.compare(password, useremail.password)

        if (ismatch) {
            res.status(200).send('LOGIN SUCCESSFULLY')
        }
        else {
            return res.send('INVALID PASSWORD')
        }

    } catch (error) {
        res.status(404).send('LOGIN ERROR')

    }

})




//     const { email, pass } = req.body; // HTML "name" property will be set to email
//     try {
//         const FindUser = await User.findOne({ email: email }, async (err, docs) => {
//             if (err) {
//                 return res.send(err)
//             }
//             else {
//                 return [
//                     res.send(docs),
//                     console.log(docs)
//                 ]

//             }



//         })

//     } catch (error) {
//         res.send(error)
//         console.log(error)
//         res.send('user not found')

//     }
// })



app.listen(port, () => {
    console.log(`listening on PORT ${port}`)
})

