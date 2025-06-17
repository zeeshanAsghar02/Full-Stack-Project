const sgMail = require('@sendgrid/mail');

/**
 * Send email using SendGrid
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 */
const sendEmail = async (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    to: options.email,
    from: {
      email: process.env.FROM_EMAIL,
      name: process.env.FROM_NAME
    },
    subject: options.subject,
    html: options.html,
  };

  try {
    await sgMail.send(message);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Email sending failed:', {
      error: error.message,
      stack: error.stack,
      sendgridConfig: {
        fromEmail: process.env.FROM_EMAIL,
        fromName: process.env.FROM_NAME,
        // Don\'t log the API key
      },
    });
    throw new Error('Email could not be sent. Please check SendGrid configuration.');
  }
};

module.exports = sendEmail; 