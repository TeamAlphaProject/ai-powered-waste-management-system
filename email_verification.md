# Forgot Password Flow

## 1. Overall Flow

1. **User clicks "Forgot Password"**

2. **User enters email**

3. **Server performs the following actions:**
   - Checks if the email exists in the database
   - Generates a One-Time Password (OTP)
   - Saves the OTP and its expiry time in the database
   - Sends the OTP to the user's email

4. **User enters the OTP in the application**

5. **Server verifies:**
   - Whether the OTP is correct
   - Whether the OTP has not expired

6. **If OTP is valid:**
   - Allow the user to reset the password

7. **After password reset:**
   - User logs in with the new password
   - User is redirected to the **dashboard**