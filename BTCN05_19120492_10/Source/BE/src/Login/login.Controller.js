const passport = require('passport');

exports.login = async (req, res, next) => {     // 5.3 
    //gọi db check dữ liệu trong req
    // so sánh dữ liệu -> khớp thì return res.send({
    //             'ReturnCode': 1,
    //             'Message': "Đăng nhập thành công." 
    //         });

    passport.authenticate('local', function (err, user, info) {  
        // Nhập thông tin chưa đầy đủ
        if (!user && info && info.message === 'Missing credentials')
            return res.send({
                'ReturnCode': -3,
                'Message': "Vui lòng nhập đầy đủ thông tin." 
            });
 
        //Tài khoản không tồn tại trong database
        if (err)
            return res.send({
                'ReturnCode': -1,
                'Message': "Tài khoản không tồn tại." 
            });

        if (info) {
            return res.send({
                'ReturnCode': -2,
                'Message': info.message
            });
        }

        req.logIn(user, async function () {
            return res.send({
                'ReturnCode': 1,
                'Message': "Đăng nhập thành công." 
            });
        });
    })(req, res, next);
}