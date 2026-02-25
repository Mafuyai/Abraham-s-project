exports.VERIFY_SUCCESS_TEMPLATE = (name) => `
<!DOCTYPE html>
<html>
<head>
    <title>Email Verified Successfully</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #0066cc; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Verification Successful!</h1>
    </div>
    
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Dear ${name},</p>
        
        <p>Congratulations! Your email has been successfully verified.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <p style="color: #0066cc; font-size: 18px;">Your account is now fully activated!</p>
            <p>You can now sign in to your account using your email and password.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/login" 
               style="background-color: #0066cc; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;">
                Login Now
            </a>
        </div>
        
        <p>Thank you for choosing Ahia-Oma!</p>
        
        <p>Best regards,<br>The Ahia-Oma Team</p>
    </div>
</body>
</html>
`;
