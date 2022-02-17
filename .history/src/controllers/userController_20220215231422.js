let handleLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password) {
        return res.status(500).json({
            errCode: 1, //mã lỗi
            message: 'Missing inputs parameter!'
        })
    }
    return res.status(200).json({
        errCode: 0,
        message: 'hello world',
        yourEmail: email,
        test: 'test'
    })
}

module.exports = {
    handleLogin: handleLogin
}