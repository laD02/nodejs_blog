const Course = require('../models/Course')
const {multipleMongooseObject} = require('../../util/mongoose')

class MeControllers {

    
    storedCourse(req, res, next) {

        Promise.all([Course.find(), Course.countWithDeleted({deleted : true})])
            .then(([courses, deleteCourses]) => 
                res.render('me/stored-courses',{
                    deleteCourses,
                    courses : multipleMongooseObject(courses)
                })
            )

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses : multipleMongooseObject(courses)
        //     }))

    }

    trashCourse(req, res, next) {
        Course.findWithDeleted({deleted:true})
            .then(courses => res.render('me/trash-courses', {
                courses : multipleMongooseObject(courses)
            }))
    }


}

module.exports = new MeControllers