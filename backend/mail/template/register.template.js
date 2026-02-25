exports.REGISTER_TEMPLATE = (name, email) => `
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Ahia-Oma</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #0066cc; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Welcome to Ahia-Oma!</h1>
    </div>
    
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Dear ${name},</p>
        
        <p>Thank you for starting your registration with Ahia-Oma. You're almost there!</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p>To complete your registration, please verify your email address in the next step.</p>
        </div>
        
        <p>You'll receive another email shortly with your verification code.</p>
        
        <p style="color: #666;">If you didn't create an account with Ahia-Oma, please ignore this email.</p>
        
        <p>Best regards,<br>The Ahia-Oma Team</p>
    </div>
</body>
</html>
`;
