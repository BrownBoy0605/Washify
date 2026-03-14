# 📧 Gmail Email Notification Setup - Quick Start

## What Was Added

✅ **Email notifications system** for booking confirmations
- Owner receives email when new booking is made
- Full booking details in formatted HTML email
- Optional customer confirmation emails

## Files Modified/Created

1. **`lib/email.ts`** (NEW)
   - Email sending configuration using Nodemailer
   - `sendBookingNotification()` - Sends email to owner
   - `sendCustomerConfirmation()` - Optional customer email

2. **`app/api/bookings/route.ts`** (MODIFIED)
   - Imports email service
   - Automatically sends notification after booking creation

3. **`EMAIL_SETUP.md`** (NEW)
   - Complete setup guide with steps
   - Troubleshooting tips
   - Production deployment info

4. **`.env.local.example`** (NEW)
   - Template for environment variables

## Quick Setup (3 Steps)

### Step 1: Get Gmail App Password
1. Go to [Google Account Settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if needed
3. Find **App passwords** section
4. Generate a password for "Mail" and "Windows Computer"
5. Copy the 16-character password

### Step 2: Create `.env.local`
In project root, create `.env.local` with:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
OWNER_EMAIL=owner@washify.com
```

### Step 3: Test
1. Run: `npm run dev`
2. Make a test booking
3. Check owner email for notification

## Environment Variables

| Variable | Example | Purpose |
|----------|---------|---------|
| `GMAIL_USER` | washify@gmail.com | Gmail account sending emails |
| `GMAIL_APP_PASSWORD` | abcd efgh ijkl mnop | 16-char app password from Google |
| `OWNER_EMAIL` | owner@washify.com | Where notifications are sent |

## Email Features

### Owner Notification Includes:
- Booking ID (unique identifier)
- Customer name & phone
- Service location (city & address)
- Date & time slot
- Selected services list
- Car type
- Total price
- Water & electricity availability

### Format:
- Professional HTML email
- Washify branding (red theme)
- Easy-to-read table format
- Contact link in phone field

## Packages Installed

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Important Notes

⚠️ **Security:**
- Never use your main Gmail password
- Always use App Password (more secure)
- Never commit `.env.local` to Git

⚠️ **First Time:**
- Make sure 2-Step Verification is enabled
- Wait a few minutes after enabling 2-Step before creating App Password
- If email doesn't send, check Gmail spam folder

## Next Steps (Optional)

- [ ] Customize email templates in `lib/email.ts`
- [ ] Add SMS notifications
- [ ] Set up automated reminders
- [ ] Add booking cancellation notifications
- [ ] Switch to SendGrid/Mailgun for production

## Troubleshooting

**Not receiving emails?**
1. Check `.env.local` has correct values
2. Verify 2-Step Verification is enabled
3. Restart dev server
4. Check Gmail spam folder
5. Look at terminal for error messages

**Want to send to customer email too?**
Update `app/api/bookings/route.ts` to capture customer email and call `sendCustomerConfirmation(email, booking)`

## Documentation

For detailed setup and troubleshooting, see `EMAIL_SETUP.md`
