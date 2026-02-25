exports.SIGNIN_TEMPLATE = (name, time, device) => `
<!DOCTYPE html>
<html>
<head>
    <title>New Sign In</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #0066cc; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Sign In Alert</h1>
    </div>
    
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Dear ${name},</p>
        
        <p>We detected a new sign in to your Ahia-Oma account.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Device:</strong> ${device}</p>
        </div>
        
        <p style="color: #666;">If this wasn't you, please secure your account immediately by changing your password.</p>
        
        <p>Best regards,<br>The Ahia-Oma Team</p>
    </div>
</body>
</html>
`;
