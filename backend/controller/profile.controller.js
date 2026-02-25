const { User } = require('../schema/user.schema.js');
const Admin = require('../schema/admin.schema.js');
const Doctor = require('../schema/doctor.schema.js');

const updateProfile = async (req, res) => {
    console.log('Profile update request received:', req.body);
    const { name, email, gender, ageRange } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required',
        });
    }

    // Validate gender
    if (gender && !['M', 'F'].includes(gender)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid gender value. Please choose "M" or "F".',
        });
    }

    try {
        // Search for the user in all role-based collections
        let entity =
            (await User.findOne({ email })) ||
            (await Admin.findOne({ email })) ||
            (await Doctor.findOne({ email }));

        if (!entity) {
            console.log('User not found in database');
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Identify role dynamically
        let Model;
        if (entity.role === 'user') Model = User;
        else if (entity.role === 'admin') Model = Admin;
        else if (entity.role === 'doctor') Model = Doctor;

        console.log(`${entity.role} found:`, entity);

        // Check if the profile is already completed before updating
        if (entity.profileCompleted) {
            console.log('Profile already completed for this user.');
            return res.status(400).json({
                success: false,
                message: 'Profile is already completed.',
            });
        }

        // Update the profile
        const updatedEntity = await Model.findOneAndUpdate(
            { email },
            {
                $set: {
                    name,
                    gender,
                    ageRange,
                    profileCompleted: true, // Update profile completion status
                },
            },
            { new: true } // Return the updated document
        );

        console.log(`${entity.role} updated:`, updatedEntity);

        // Respond with success
        res.status(200).json({
            success: true,
            message: `${entity.role} profile updated successfully`,
            user: updatedEntity,
        });
    } catch (err) {
        console.error('Error during profile update:', err);
        res.status(500).json({
            success: false,
            message: 'Could not update profile',
        });
    }
};
const getProfile = async (req, res) => {
    try {
        const { email } = req.user; // Assuming authentication middleware adds `req.user`
        const user =
            (await User.findOne({ email })) ||
            (await Admin.findOne({ email })) ||
            (await Doctor.findOne({ email }));

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Ensure `profileCompleted` is returned
        res.status(200).json({
            success: true,
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                profileCompleted: user.profileCompleted, // ✅ Explicitly sending it
            },
        });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


module.exports = {
    updateProfile,
    getProfile
};
