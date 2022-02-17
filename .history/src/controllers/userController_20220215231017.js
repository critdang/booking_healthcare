let handleLogin = (req, res) => {
    let email = req.body.email;
    console.log(req.body)
    let password = req.body.password;
    return res.status(200).json({
        message: 'hello world',
        yourEmail: email,
        test: 'test'
    })
}

module.exports = {
    handleLogin: handleLogin
}