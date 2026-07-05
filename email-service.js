/**
 * Transcend Astro — Email Service
 * Sends beautifully designed Thank You emails via Nodemailer
 */
const nodemailer = require('nodemailer');

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'rich1974@gmail.com',
      pass: process.env.SMTP_PASS || ''
    },
    tls: { rejectUnauthorized: false }
  });
}

/**
 * Generate the premium Thank You email HTML
 */
function generateThankYouHTML(name) {
  const firstName = name ? name.split(' ')[0] : 'there';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You — Transcend Astro</title>
</head>
<body style="margin:0; padding:0; background-color:#FAF8F4; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2E2E2E 0%, #1E1E1E 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin:0; color:#C8A15A; font-size:28px; font-weight:300; letter-spacing:4px;">TRANSCEND</h1>
              <p style="margin:4px 0 0; color:#999; font-size:11px; letter-spacing:3px; text-transform:uppercase;">Astro Interior Consultant</p>
            </td>
          </tr>
          
          <!-- Gold Accent Line -->
          <tr>
            <td style="height:3px; background: linear-gradient(90deg, #C8A15A, #dfb975, #C8A15A);"></td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <p style="color:#C8A15A; font-size:14px; letter-spacing:2px; text-transform:uppercase; margin:0 0 16px;">✦ Thank You</p>
              
              <h2 style="color:#1E1E1E; font-size:24px; font-weight:400; margin:0 0 20px; line-height:1.4;">
                Dear ${firstName},
              </h2>
              
              <p style="color:#555555; font-size:15px; line-height:1.8; margin:0 0 20px;">
                Thank you for reaching out to <strong>Transcend Consultant</strong>. We are delighted to receive your consultation request and truly appreciate your interest in aligning your living space with your cosmic blueprint.
              </p>
              
              <p style="color:#555555; font-size:15px; line-height:1.8; margin:0 0 20px;">
                Our team will review your details and <strong>connect with you within 24 hours</strong> to schedule your personalized Astro Interior consultation.
              </p>
              
              <!-- Divider -->
              <hr style="border:none; border-top:1px solid #E8E3DB; margin:30px 0;">
              
              <!-- What to Expect -->
              <h3 style="color:#1E1E1E; font-size:18px; font-weight:500; margin:0 0 15px;">What Happens Next?</h3>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0; color:#555; font-size:14px; line-height:1.6;">
                    <span style="color:#C8A15A; font-weight:600; margin-right:8px;">01.</span>
                    Our team reviews your consultation request
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#555; font-size:14px; line-height:1.6;">
                    <span style="color:#C8A15A; font-weight:600; margin-right:8px;">02.</span>
                    We reach out to schedule your discovery call
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#555; font-size:14px; line-height:1.6;">
                    <span style="color:#C8A15A; font-weight:600; margin-right:8px;">03.</span>
                    Your personalized astro-interior journey begins
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="https://www.transcendconsultant.com" style="display:inline-block; background:#C8A15A; color:#FFFFFF; text-decoration:none; padding:14px 36px; border-radius:8px; font-size:14px; font-weight:500; letter-spacing:1px;">VISIT OUR WEBSITE</a>
              </div>
            </td>
          </tr>
          
          <!-- Contact Info -->
          <tr>
            <td style="background-color:#F6F5F2; padding: 30px 40px; border-top: 1px solid #E8E3DB;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#555; font-size:13px; line-height:1.8;">
                    <strong style="color:#1E1E1E;">Richa Agarwal</strong><br>
                    Founder & Lead Astro-Interior Consultant<br><br>
                    📞 <a href="tel:+917838048195" style="color:#C8A15A; text-decoration:none;">+91 78380 48195</a><br>
                    📧 <a href="mailto:rich1974@gmail.com" style="color:#C8A15A; text-decoration:none;">rich1974@gmail.com</a><br>
                    💬 <a href="https://wa.me/917838048195" style="color:#C8A15A; text-decoration:none;">Chat on WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background:#2E2E2E; padding: 20px 40px; text-align:center;">
              <p style="color:#888; font-size:11px; margin:0; line-height:1.6;">
                © ${new Date().getFullYear()} Transcend Consultant. All Rights Reserved.<br>
                1079, 4th Floor, Sector B, Pocket 1, Vasant Kunj, New Delhi — 110070
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send Thank You email to the lead
 */
async function sendThankYouEmail(leadData) {
  // Don't attempt if no SMTP password configured
  if (!process.env.SMTP_PASS) {
    console.log('[Email] SMTP_PASS not configured. Skipping email for:', leadData.email);
    return { success: false, reason: 'SMTP not configured' };
  }

  if (!leadData.email) {
    console.log('[Email] No email address provided. Skipping.');
    return { success: false, reason: 'No email address' };
  }

  try {
    const transporter = createTransporter();
    
    const info = await transporter.sendMail({
      from: `"Transcend Consultant" <${process.env.SMTP_USER || 'rich1974@gmail.com'}>`,
      to: leadData.email,
      subject: `Thank You, ${leadData.name || 'there'}! — Transcend Astro Interior Consultation`,
      html: generateThankYouHTML(leadData.name),
      headers: {
        'X-Priority': '1',
        'X-Mailer': 'Transcend Consultant Mailer'
      }
    });

    console.log(`[Email] Thank you email sent to ${leadData.email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email] Failed to send to ${leadData.email}:`, error.message);
    return { success: false, reason: error.message };
  }
}

module.exports = { sendThankYouEmail };
