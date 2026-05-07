export const SIGNIN_TEMPLATE = (name: string, time: string, device: string): string => `
<!DOCTYPE html>
<html>
<head><title>New Sign In</title></head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #2E7D32; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Sign In</h1>
    </div>
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Hello ${name},</p>
        <p>A new sign in was detected on your Project AB account.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Device:</strong> ${device}</p>
        </div>
        <p style="color: #666;">If this wasn't you, change your password immediately.</p>
        <p>— The Project AB Team</p>
    </div>
</body>
</html>
`;
