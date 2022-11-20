const userModel = require('../account.Model'),
    bcrypt = require('bcryptjs'),
    saltRounds = parseInt(process.env.SALT_ROUND);

exports.helo = (req, res) => {
    res.send("heelo world");
}

exports.register = async (req, res) => {
    const {Username, Password} = req.body;
     
    try {
        if(Username.length != 0 && Password.length != 0) {
            const pwdHashed = await bcrypt.hash(Password, saltRounds);

            let account = {
                Username: Username,
                Password: pwdHashed,
            };
            await userModel.add(account);

            res.send({
                'ReturnCode': 1,
                'Message': "Đăng ký thành công." 
            });
        }

        res.send({
        'ReturnCode': 0,
        'Message': "Đăng ký thất bại" 
        });
    } catch (error) {

    }
}