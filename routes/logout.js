const express = require('express')
const router = express.Router()
const {redirectToLogin} = require('../middleware')

router.get('/', redirectToLogin, (req,res) => {
    req.session.destroy(err => {
        if(err) {
        console.log(err)
        res.send(err)
        } else{
            res.clearCookie('mrcoffee_sid')
            res.redirect('/')
        }
    })

})

module.exports = router