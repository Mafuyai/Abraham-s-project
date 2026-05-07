export const REGISTER_TEMPLATE = (name: string, email: string): string => `
<!DOCTYPE html>
<html>
<head><title>Welcome to Project AB</title></head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #2E7D32; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Welcome</h1>
    </div>
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Hello ${name},</p>
        <p>Your account (${email}) is being set up on the Farmer Input Distribution platform. Watch for a verification code in a moment.</p>
        <p>— The Project AB Team</p>
    </div>
</body>
</html>
`;
