const express = require('express')
const app = express()
const port = process.env.PORT || 80
require('./db/conn')
const User = require('./models/user')
const { json } = require('body-parser')
// const bcrypt=require("bcrypt")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const path = require('path')

// path.join(__dirname,'.')
app.set('view engine', 'hbs')
// app.use(path.join(__dirname,))


app.get('/', (req, res) => {
    res.render('index')

})


// Sign Up Process
app.post('/SignUP', async (req, res) => {

    const { email } = req.body; // HTML "name" property will be set to email




    try {
        User.find({ email: { $ne: req.body.email } }, async function (err, user) {
            if (err) {
                return res.status(400).json(
                    { msg: "Email  Already Exist" })
            }
            else {

                //IF NO ERROR THAN REGISTER THE USER

                const RegUser = new User(req.body)
                const Saved = await RegUser.save()
                console.log(Saved)
                res.send([Saved, 'USER REGISTERED'])

            }

        })
    } catch (error) {
        res.send(error)
        console.log(error);
    }


}
)

// LOGIN SYSTEM 

app.post('/login', async (req, res) => {
    const { email, pass } = req.body; // HTML "name" property will be set to email
    try {
        const FindUser = await User.findOne({ email: email }, async (err, docs) => {
            if (err) {
                return res.send(err)
            }
            else {
                return [
                    res.send(docs),
                    console.log(docs)
                ]

            }



        })

    } catch (error) {
        res.send(error)
        console.log(error)
        res.send('user not found')

    }
})



app.listen(port, () => {
    console.log(`listening on PORT ${port}`)
})

