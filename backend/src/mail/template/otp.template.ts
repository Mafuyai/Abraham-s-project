export const OTP_TEMPLATE = (name: string, otp: string): string => `
<!DOCTYPE html>
<html>
<head><title>Verification Code</title></head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #2E7D32; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Verification Code</h1>
    </div>
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Hello ${name},</p>
        <p>Your verification code:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <h2 style="color: #2E7D32; font-size: 24px; margin: 0;">${otp}</h2>
            <p style="margin: 10px 0 0 0;">Expires in 10 minutes.</p>
        </div>
        <p>— The Project AB Team</p>
    </div>
</body>
</html>
`;
