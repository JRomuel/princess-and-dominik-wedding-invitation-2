/**
 * Deployed manually as a Web App at script.google.com — this file is a
 * version-controlled reference copy, not built or bundled by Vite.
 * The live /exec URL is referenced by VITE_RSVP_ENDPOINT.
 *
 * On each RSVP submission this appends a row to the active sheet and,
 * for guests marked "Attending" with an email address, sends a
 * boarding-pass-style HTML confirmation email.
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const data = JSON.parse(e.postData.contents)

  sheet.appendRow([
    new Date(),
    data.firstName,
    data.lastName,
    data.email,
    data.confirmation,
    data.ageGroup,
    data.guestOf,
    data.category,
  ])

  if (data.confirmation === 'Attending' && data.email) {
    sendBoardingPassEmail(data)
  }

  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON)
}

function sendBoardingPassEmail(data) {
  const fullName = `${data.firstName} ${data.lastName}`.trim()
  const subject = "You're confirmed! Boarding pass for Princes & Dominik's wedding"

  const plainBody = `Hi ${fullName},

Your RSVP is confirmed for Princes & Dominik's wedding.

Ceremony: Boac Cathedral, Mataas na Bayan, Boac, Marinduque — 2:00 PM
Reception: Luxor Resort, Brgy. Pangi, Gasan, Marinduque — 6:00 PM
Date: January 28, 2027

See you there!`

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: plainBody,
    htmlBody: buildBoardingPassHtml(fullName, data),
    name: 'Princes & Dominik',
  })
}

function buildBoardingPassHtml(fullName, data) {
  const sans = "Arial, Helvetica, sans-serif"
  const serif = "Georgia, 'Times New Roman', serif"
  const script = "'Brush Script MT', 'Segoe Script', cursive"
  const primary = "#A34720"
  const cream = "#FAF6F0"
  const website = 'https://princes-and-dominik.southern-planners.com/'
  const qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&margin=0&color=A34720&bgcolor=FFFFFF&data='
    + encodeURIComponent(website)

  return `
  <div style="background:#f2e9dd;padding:32px 16px;font-family:${serif};">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:${cream};border-radius:8px;border-collapse:collapse;overflow:hidden;">
      <tr>
        <td style="background:${primary};padding:14px 28px;">
          <span style="color:${cream};font-family:${sans};font-size:12px;letter-spacing:3px;text-transform:uppercase;">&#9992; Boarding Pass &middot; Confirmed</span>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 28px 8px;">
          <p style="margin:0 0 4px;font-family:${sans};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${primary};opacity:0.65;">You are invited to the wedding of</p>
          <p style="margin:0;font-family:${script};font-size:40px;color:${primary};">Princes &amp; Dominik</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 28px;">
          <p style="margin:0;font-family:${sans};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${primary};opacity:0.55;">Passenger</p>
          <p style="margin:2px 0 0;font-family:${serif};font-size:18px;color:${primary};">${fullName}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px 0;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <tr>
              <td width="50%" style="padding:0 16px 16px 0;vertical-align:top;">
                <p style="margin:0;font-family:${sans};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${primary};opacity:0.55;">Ceremony</p>
                <p style="margin:2px 0 0;font-family:${serif};font-size:14px;color:${primary};">Immaculate Conception Cathedral Parish</p>
                <p style="margin:0;font-family:${serif};font-size:12px;color:${primary};opacity:0.8;">Mataas na Bayan, Boac, Marinduque</p>
              </td>
              <td width="50%" style="padding:0 0 16px 16px;vertical-align:top;">
                <p style="margin:0;font-family:${sans};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${primary};opacity:0.55;">Time</p>
                <p style="margin:2px 0 0;font-family:${serif};font-size:14px;color:${primary};">2:00 PM</p>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:0 16px 4px 0;vertical-align:top;">
                <p style="margin:0;font-family:${sans};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${primary};opacity:0.55;">Reception</p>
                <p style="margin:2px 0 0;font-family:${serif};font-size:14px;color:${primary};">Luxor Resort & Restaurant</p>
                <p style="margin:0;font-family:${serif};font-size:12px;color:${primary};opacity:0.8;">Brgy. Pangi, Gasan, Marinduque</p>
              </td>
              <td width="50%" style="padding:0 0 4px 16px;vertical-align:top;">
                <p style="margin:0;font-family:${sans};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${primary};opacity:0.55;">Time</p>
                <p style="margin:2px 0 0;font-family:${serif};font-size:14px;color:${primary};">6:00 PM</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <div style="border-top:2px dashed rgba(163,71,32,0.3);"></div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 32px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <tr>
              <td width="100" style="padding:0;vertical-align:middle;">
                <img src="${qrSrc}" width="100" height="100" alt="QR code" style="display:block;" />
              </td>
              <td style="padding:0 0 0 20px;vertical-align:middle;text-align:left;">
                <p style="margin:0;font-family:${serif};font-size:22px;color:${primary};text-align:left;">RSVP Confirmed</p>
                <p style="margin:6px 0 0;font-family:${sans};font-size:12px;color:${primary};opacity:0.7;text-align:left;">January 28, 2027 &middot; Marinduque, Philippines</p>
                <p style="margin:2px 0 0;font-family:${sans};font-size:11px;color:${primary};opacity:0.55;text-align:left;">Party: ${data.guestOf || ''} &middot; ${data.category || ''}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`
}
