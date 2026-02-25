const { User } = require('../schema/user.schema.js');
const Doctor = require('../schema/doctor.schema.js');
const Admin = require('../schema/admin.schema.js');

const fallback = async (req, res) => {
    const email = req.body;

    try {
        const existingUser = await User.findOne({ email });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated fallback id OTP:', otp);

        if (!existingUser) {
            return res.send(404).json({
                success: false,
                message: 'User not found',
            });
        }

        existingUser.otp = otp;
        existingUser.otpExpiry = Date.now() + 10 * 60 * 1000; 
        await existingUser.save();
        console.log("Fallback otp: ", otp);
        
    } catch {
        res.status(500).json({
            success: false,
            message: 'User not found',
        });
    }
};

module.exports = { fallback };
