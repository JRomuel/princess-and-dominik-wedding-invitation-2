/**
 * Deployed manually as a Web App at script.google.com — this file is a
 * version-controlled reference copy, not built or bundled by Vite.
 * The live /exec URL is referenced by VITE_RSVP_ENDPOINT.
 *
 * On each RSVP submission this appends a row to the active sheet and,
 * for guests marked "Attending" with an email address, sends a
 * boarding-pass-style HTML confirmation email with a matching PDF
 * boarding pass attached.
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

📎 Please see the attachment — your printable boarding pass (PDF) is attached to this email.

Ceremony: Boac Cathedral, Mataas na Bayan, Boac, Marinduque — 2:00 PM
Reception: Luxor Resort, Brgy. Pangi, Gasan, Marinduque — 6:00 PM
Date: January 28, 2027

See you there!`

  const pdfBlob = HtmlService.createHtmlOutput(buildBoardingPassPdfHtml(fullName, data))
    .getAs('application/pdf')
    .setName(`Boarding-Pass-${fullName.replace(/\s+/g, '-')}.pdf`)

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: plainBody,
    htmlBody: buildBoardingPassHtml(fullName, data),
    attachments: [pdfBlob],
    name: 'Princes & Dominik',
  })
}

// Mirrors the on-site .d-boarding-pass layout (src/pages/Details/shared/BoardingPass.css),
// personalized with the guest's name, and rendered to PDF via HtmlOutput#getAs.
//
// Built with <table> + inline styles rather than flexbox/grid/writing-mode: Apps Script's
// PDF conversion runs on Google's servers, which have unreliable support for those layout
// modes and no Windows-only fonts (Brush Script MT etc silently fall back), so this mirrors
// the table-based approach already proven to work in buildBoardingPassHtml() and pulls in an
// embeddable Google Font for the cursive names.
function buildBoardingPassPdfHtml(fullName, data) {
  const primary = '#A34720'
  const cream = '#FAF6F0'
  const sans = "'Segoe UI', Arial, Helvetica, sans-serif"
  const heading = "Georgia, 'Times New Roman', serif"
  const script = "'Alex Brush', 'Brush Script MT', 'Segoe Script', cursive"
  const website = 'https://princes-and-dominik.southern-planners.com/'
  const qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=0&color=A34720&bgcolor=FFFFFF&data='
    + encodeURIComponent(website)
  // CSS background-color/color on <td>/<span> was silently dropped by Apps Script's PDF
  // renderer (confirmed by testing — the bar rendered white with grey text). Images render
  // correctly (the QR code proves it), so the primary-colored header bar with white text is
  // drawn as an inline SVG (rendered client-side, not styled via page CSS) — this also gives
  // exact control over font size and left alignment that hosted placeholder-image services don't.
  const headerBarWidth = 1190
  const headerBarHeight = 56
  const headerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${headerBarWidth}" height="${headerBarHeight}">`
    + `<rect width="${headerBarWidth}" height="${headerBarHeight}" fill="${primary}"/>`
    + `<text x="30" y="${headerBarHeight / 2 + 6}" font-family="Arial, Helvetica, sans-serif" `
    + `font-size="16" font-weight="700" letter-spacing="2" fill="#FFFFFF">BOARDING PASS &#183; CONFIRMED</text>`
    + `</svg>`
  const headerBarSrc = 'data:image/svg+xml;base64,' + Utilities.base64Encode(headerSvg)

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap">
<style>
  @page { size: 1280px 672px; margin: 0; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: ${sans};
    width: 1280px;
    height: 672px;
    box-sizing: border-box;
    padding: 45px;
  }
</style>
</head>
<body>
  <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${cream};border-radius:13px;border:1px solid rgba(163,71,32,0.15);">
    <tr>
      <td colspan="3" style="padding:0;line-height:0;">
        <img src="${headerBarSrc}" width="${headerBarWidth}" height="${headerBarHeight}" alt="Boarding Pass - Confirmed" style="display:block;width:100%;height:auto;border-top-left-radius:12px;border-top-right-radius:12px;" />
      </td>
    </tr>
    <tr>
      <td style="padding:32px 38px;vertical-align:top;text-align:left;">
        <p style="margin:0 0 6px;font-family:${sans};font-size:16px;letter-spacing:3px;text-transform:uppercase;color:${primary};opacity:0.65;">You are invited to the wedding of</p>
        <p style="margin:0 0 26px;font-family:${script};font-size:61px;color:${primary};line-height:1.3;">Princes &amp; Dominik</p>

        <p style="margin:0 0 3px;font-family:${sans};font-size:14px;letter-spacing:3px;text-transform:uppercase;color:${primary};opacity:0.55;">Guest</p>
        <p style="margin:0 0 26px;font-family:${sans};font-size:26px;color:${primary};">${fullName}</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td width="60%" style="padding:0 26px 19px 0;vertical-align:top;text-align:left;">
              <p style="margin:0;font-family:${sans};font-size:14px;letter-spacing:3px;text-transform:uppercase;color:${primary};opacity:0.55;">Ceremony</p>
              <p style="margin:3px 0 0;font-family:${sans};font-size:21px;color:${primary};">Immaculate Conception Cathedral Parish</p>
              <p style="margin:0;font-family:${sans};font-size:19px;color:${primary};opacity:0.8;">Boac, Marinduque</p>
            </td>
            <td style="padding:0 0 19px;vertical-align:top;text-align:left;">
              <p style="margin:0;font-family:${sans};font-size:14px;letter-spacing:3px;text-transform:uppercase;color:${primary};opacity:0.55;">Time</p>
              <p style="margin:3px 0 0;font-family:${sans};font-size:21px;color:${primary};">2:00 PM</p>
            </td>
          </tr>
          <tr>
            <td width="60%" style="padding:0 26px 0 0;vertical-align:top;text-align:left;">
              <p style="margin:0;font-family:${sans};font-size:14px;letter-spacing:3px;text-transform:uppercase;color:${primary};opacity:0.55;">Reception</p>
              <p style="margin:3px 0 0;font-family:${sans};font-size:21px;color:${primary};">Luxor Resort &amp; Restaurant</p>
              <p style="margin:0;font-family:${sans};font-size:19px;color:${primary};opacity:0.8;">Gasan, Marinduque</p>
            </td>
            <td style="padding:0;vertical-align:top;text-align:left;">
              <p style="margin:0;font-family:${sans};font-size:14px;letter-spacing:3px;text-transform:uppercase;color:${primary};opacity:0.55;">Time</p>
              <p style="margin:3px 0 0;font-family:${sans};font-size:21px;color:${primary};">6:00 PM</p>
            </td>
          </tr>
        </table>
      </td>
      <td width="1" style="padding:32px 0;">
        <div style="border-left:3px dashed rgba(163,71,32,0.3);height:100%;"></div>
      </td>
      <td width="288" style="padding:32px;vertical-align:middle;text-align:center;">
        <p style="margin:0;font-family:${heading};font-size:35px;color:${primary};">RSVP Confirmed</p>
        <p style="margin:13px 0 0;font-family:${sans};font-size:18px;color:${primary};opacity:0.7;">January 28, 2027</p>
        <p style="margin:3px 0 0;font-family:${sans};font-size:18px;color:${primary};opacity:0.7;">Party: ${data.guestOf || ''}</p>
        <div style="margin-top:16px;padding:13px;background:#ffffff;border-radius:10px;">
          <img src="${qrSrc}" width="224" height="224" alt="QR code" style="display:block;width:100%;height:auto;" />
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`
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
          <span style="color:#fff;font-family:${sans};font-size:12px;letter-spacing:3px;text-transform:uppercase;">&#9992; Boarding Pass &middot; Confirmed</span>
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
      <tr>
        <td style="padding:0 28px 32px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;background:rgba(163,71,32,0.08);border:1px solid rgba(163,71,32,0.25);border-radius:6px;">
            <tr>
              <td style="padding:12px 16px;">
                <span style="font-family:${sans};font-size:13px;color:${primary};">&#128206; <strong>Please see the attachment</strong> &mdash; your printable boarding pass (PDF) is attached to this email.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`
}
