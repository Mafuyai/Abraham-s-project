export const VERIFICATION_EMAIL_TEMPLATE = (otp: string, name: string): string => `
<!DOCTYPE html>
<html>
<head><title>Verify Your Account</title></head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #2E7D32; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">One More Step</h1>
    </div>
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Hello ${name},</p>
        <p>Welcome to the Farmer Input Distribution platform. Use the code below to verify your account:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <h2 style="color: #2E7D32; font-size: 32px; margin: 0;">${otp}</h2>
            <p style="margin: 10px 0 0 0;">This code expires in 10 minutes.</p>
        </div>
        <p style="color: #666;">If you didn't request this, ignore this email.</p>
        <p>— The Project AB Team</p>
    </div>
</body>
</html>
`;
