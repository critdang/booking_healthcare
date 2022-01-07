let getHomePage = (req, res) => {
    // vì ở view engine đã cài đặt là nằm ở src/views nên không cần đường dẫn
    // render ra view
    return res.render('homepage.ejs');
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage:getAboutPage
}