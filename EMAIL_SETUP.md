# Gmail Booking Notification Setup Guide

## Overview
The booking system now sends email notifications to the owner when a new booking is made.

## Prerequisites
- A Gmail account

## Setup Steps

### 1. Create an App Password (Recommended)

Instead of using your main Gmail password, Google recommends creating an "App Password":

1. Go to [Google Account Settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to **App passwords** (or search for it)
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Copy this password

### 2. Update Environment Variables

Create or update your `.env.local` file in the project root:

```env
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
OWNER_EMAIL=owner-email@gmail.com
```

**Important Notes:**
- `GMAIL_USER`: Your Gmail address (e.g., washify.bookings@gmail.com)
- `GMAIL_APP_PASSWORD`: The 16-character app password from Google (NOT your regular password)
- `OWNER_EMAIL`: The email address where notifications will be sent (can be different from GMAIL_USER)

### 3. Example `.env.local`

```env
# Gmail Configuration
GMAIL_USER=washify.bookings@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
OWNER_EMAIL=owner@washify.com
```

### 4. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the booking page and create a test booking

3. Check the owner's email for the notification

## Email Notifications

### Owner Notification
When a booking is made, the owner receives an email with:
- Booking ID
- Customer details (name, phone, address)
- Booking date and time slot
- Selected services and car type
- Total price
- Water & electricity availability status

### What to Do Next
You can optionally:
- Customize email templates in `lib/email.ts`
- Add customer confirmation emails (currently set up but not sent by default)
- Add SMS notifications alongside email
- Set up automated reminders

## Troubleshooting

### Emails not sending?

1. **Check environment variables:**
   - Make sure `.env.local` is in the project root
   - Restart the dev server after adding env variables

2. **App Password issue:**
   - Verify 2-Step Verification is enabled
   - If 2-Step is recent, wait a few minutes before creating App Password
   - Make sure you copied the entire 16-character password (spaces included)

3. **Gmail Account Security:**
   - Check if Gmail flagged suspicious activity
   - You may need to allow "Less secure app access" (not recommended but alternative)

4. **Check Logs:**
   - Look at terminal output for error messages when booking is created

## Production Deployment

When deploying to production:

1. Add environment variables to your hosting platform (Vercel, Railway, etc.):
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `OWNER_EMAIL`

2. Never commit `.env.local` to version control

3. Consider using a dedicated email service like SendGrid or Mailgun for higher reliability

## Reference

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Password Guide](https://support.google.com/accounts/answer/185833)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
