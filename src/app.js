const express = require('express')
const app = express()
const port = process.env.PORT || 80
require('./db/conn')
const User = require('./models/user')
const { json } = require('body-parser')
const bcrypt = require("bcryptjs")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    res.render('index')

})


// Sign Up Process
app.post('/SignUP', async (req, res) => {

    const { email } = req.body; // HTML "name" property will be set to email




    try {
        const FindEmail = await User.find({ email: email });

        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send('Email  Already Exist')


        else {
            //IF NO ERROR THAN REGISTER THE USER
            const RegUser = new User(req.body)
            const Saved = await RegUser.save()
            console.log(Saved)
            res.send([Saved, 'USER REGISTERED'])

        }


    } catch (error) {
        res.send('Sign Up Error')
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

