const siteRouter = require('./site')
const courseRouter = require('./courses')
const meRouter = require('./me')
const Account = require('../apps/models/Account')

function route(app) {

    app.use('/courses', courseRouter)
    app.use('/me', meRouter)
    app.use('/', siteRouter)



    app.post('/register',  async(req, res, next )=>{
        let { username, password, repassword} = req.body

        if(!username || !password || ! repassword){
            return res.json({
                success: false,
                message: 'Thiếu thông tin truyền lên!'
            })
        }

        if(password != repassword){
            return res.json({
                success:false,
                message:"Mat khau nhap lai sai"
            })
        }

        let checkExist = await Account.findOne({username})
        if(!checkExist ) {
            return res.json({
                success:false,
                message:"tai khoan ton tai"
            })
        }

        const newAccount = new Account({username, password})
        await newAccount.save()
        return res.json({
            success: true,
            message:"dang ky thanh cong"
        })
    })

    app.post('/login',async (req, res, next)=>{
        let {username, password} = req.body
    
        if(!username || !password) {
            return res.json({
                success: false,
                message: 'Thieu thong tin dang nhap'
            })
        }

        let checkUsername = await Account.findOne({username})
        console.log(checkUsername)
        if(!checkUsername  ) {
            return res.json({
                success: false,
                message: "tai khoan khong ton tai"
            })
        }

        if(checkUsername && password !== checkUsername.password) {
            return res.json({
                success: false,
                message: 'sai mat khau'
            })
        }

        if(checkUsername && password === checkUsername.password){
            return res.json({
                success: true,
                message: 'dang nhap thanh cong',
                data: checkUsername
            })
        }

    })
}

module.exports = route