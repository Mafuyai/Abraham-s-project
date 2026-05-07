export const VERIFY_SUCCESS_TEMPLATE = (name: string): string => `
<!DOCTYPE html>
<html>
<head><title>Account Verified</title></head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333;">
    <div style="background-color: #2E7D32; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Verification Successful</h1>
    </div>
    <div style="padding: 20px; background-color: #ffffff;">
        <p>Hello ${name},</p>
        <p>Your account is verified. You can now sign in to register farmers and record input distributions.</p>
        <p>— The Project AB Team</p>
    </div>
</body>
</html>
`;
