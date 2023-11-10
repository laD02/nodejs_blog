const Course = require('../models/Course')
const {mongooseToObject} = require('../../util/mongoose')

class CourseControllers {

    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then((course) => {
                res.render('courses/show', {
                    course : mongooseToObject(course)
                 })
            })
            .catch(next)
    }

    create(req, res, next) {
        res.render('courses/create')
    }

    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://files.fullstack.edu.vn/f8-prod/courses/6.png`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
    }

    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(()=> res.redirect('/me/stored/course'))
    }
    
    destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
    }

    forceDestroy(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
    }

    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
    }

    handleFormActions(req, res, next) {
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(()=> res.redirect('back'))
                break 
        }
    }

    restoreForceFormAction(req, res, next) {
        switch(req.body.action) {
            case'force-delete':
                Course.deleteOne({_id: {$in: req.body.courseIds}})
                    .then(()=>res.redirect('back'))
                break
            case 'restore': 
                Course.restore({_id: {$in : req.body.courseIds}})
                    .then(()=> res.redirect('back'))
                break    
        }
    }

}

module.exports = new CourseControllers