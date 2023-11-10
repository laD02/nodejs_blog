const Course = require('../models/Course')
const {multipleMongooseObject} = require('../../util/mongoose')

class SiteControllers {

    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses : multipleMongooseObject(courses)
                 })
            })
            .catch(next)
    }

}

module.exports = new SiteControllers