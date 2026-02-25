exports.VERIFICATION_EMAIL_TEMPLATE = (otp, name) => `
<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #0066cc; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">One More Step!</h1>
    </div>
    
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Dear ${name},</p>
        
        <p>Thank you for registering with Ahia-oma. To complete your registration, please use the verification code below:</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <h2 style="color: #0066cc; font-size: 32px; margin: 0;">${otp}</h2>
            <p style="margin: 10px 0 0 0;">This code will expire in 10 minutes</p>
        </div>
        
        <p style="color: #666;">If you didn't request this code, please ignore this email.</p>
        
        <p>Best regards,<br>The Ahia-Oma Team</p>
    </div>
</body>
</html>
`;
