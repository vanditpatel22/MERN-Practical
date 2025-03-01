const GLOBALS = require('./constant');

// Verify Email mail template
exports.verify_email = async (result) => {
    const template = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${GLOBALS.APP_NAME} - Verify Email</title>

            <style type="text/css">
                @media only screen and (max-width: 480px) {
                body,
                table,
                td,
                p,
                a,
                li,
                blockquote {
                    -webkit-text-size-adjust: none !important
                }
                body {
                    width: 100% !important;
                    min-width: 100% !important
                }
                td[id=bodyCell] {
                    padding: 10px !important
                }
                table.kmMobileHide {
                    display: none !important
                }
                table[class=kmTextContentContainer] {
                    width: 100% !important
                }
                table[class=kmBoxedTextContentContainer] {
                    width: 100% !important
                }
                td[class=kmImageContent] {
                    padding-left: 0 !important;
                    padding-right: 0 !important
                }
                img[class=kmImage],
                img.kmImage {
                    width: 100% !important
                }
                td.kmMobileStretch {
                    padding-left: 0 !important;
                    padding-right: 0 !important
                }
                table[class=kmSplitContentLeftContentContainer],
                table.kmSplitContentLeftContentContainer,
                table[class=kmSplitContentRightContentContainer],
                table.kmSplitContentRightContentContainer,
                table[class=kmColumnContainer],
                td[class=kmVerticalButtonBarContentOuter] table[class=kmButtonBarContent],
                td[class=kmVerticalButtonCollectionContentOuter] table[class=kmButtonCollectionContent],
                table[class=kmVerticalButton],
                table[class=kmVerticalButtonContent] {
                    width: 100% !important
                }
                td[class=kmButtonCollectionInner] {
                    padding-left: 9px !important;
                    padding-right: 9px !important;
                    padding-top: 9px !important;
                    padding-bottom: 0 !important;
                    background-color: transparent !important
                }
                td[class=kmVerticalButtonIconContent],
                td[class=kmVerticalButtonTextContent],
                td[class=kmVerticalButtonContentOuter] {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    padding-bottom: 9px !important
                }
                table[class=kmSplitContentLeftContentContainer] td[class=kmTextContent],
                table[class=kmSplitContentRightContentContainer] td[class=kmTextContent],
                table[class=kmColumnContainer] td[class=kmTextContent],
                table[class=kmSplitContentLeftContentContainer] td[class=kmImageContent],
                table[class=kmSplitContentRightContentContainer] td[class=kmImageContent],
                table.kmSplitContentLeftContentContainer td.kmImageContent,
                table.kmSplitContentRightContentContainer td.kmImageContent {
                    padding-top: 9px !important
                }
                td[class="rowContainer kmFloatLeft"],
                td.rowContainer.kmFloatLeft,
                td[class="rowContainer kmFloatLeft firstColumn"],
                td.rowContainer.kmFloatLeft.firstColumn,
                td[class="rowContainer kmFloatLeft lastColumn"],
                td.rowContainer.kmFloatLeft.lastColumn {
                    float: left;
                    clear: both;
                    width: 100% !important
                }
                table[class=templateContainer],
                table[class="templateContainer brandingContainer"],
                div[class=templateContainer],
                div[class="templateContainer brandingContainer"],
                table[class=templateRow] {
                    max-width: 600px !important;
                    width: 100% !important
                }
                h1 {
                    font-size: 24px !important;
                    line-height: 130% !important
                }
                h2 {
                    font-size: 20px !important;
                    line-height: 130% !important
                }
                h3 {
                    font-size: 18px !important;
                    line-height: 130% !important
                }
                h4 {
                    font-size: 16px !important;
                    line-height: 130% !important
                }
                td[class=kmTextContent] {
                    font-size: 14px !important;
                    line-height: 130% !important
                }
                td[class=kmTextBlockInner] td[class=kmTextContent] {
                    padding-right: 18px !important;
                    padding-left: 18px !important
                }
                table[class="kmTableBlock kmTableMobile"] td[class=kmTableBlockInner] {
                    padding-left: 9px !important;
                    padding-right: 9px !important
                }
                table[class="kmTableBlock kmTableMobile"] td[class=kmTableBlockInner] [class=kmTextContent] {
                    font-size: 14px !important;
                    line-height: 130% !important;
                    padding-left: 4px !important;
                    padding-right: 4px !important
                }
                }
                .btn {
                  display: inline-block;
                  padding: 6px 12px;
                  margin-bottom: 0;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 1.42857143;
                  text-align: center !important;
                  white-space: nowrap;
                  vertical-align: middle;
                  -ms-touch-action: manipulation;
                  touch-action: manipulation;
                  cursor: pointer;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                  background-image: none;
                  border: 1px solid transparent;
                  border-radius: 4px;
                }
                .btn-default, .btn-default:hover, .btn-default:focus, .btn-default:active, .btn-default.active, .btn-default.focus, .btn-default:active, .btn-default:focus, .btn-default:hover, .open > .dropdown-toggle.btn-default {
                    background: #462759 !important;
                    border: 1px solid #462759 !important;
                    color: white !important;
                    text-decoration: none !important;
                }
            </style>
            <!--[if mso]>
            <style>

              .templateContainer {
                border: 1px none #aaaaaa;
                background-color: #FFFFFF;

              }
              #brandingContainer {
                background-color: transparent !important;
                border: 0;
              }


              .templateContainerInner {
                padding: 0px;
              }

            </style>
            <![endif]-->
        </head>
          <body style="margin:0;padding:0;background-color:#FFF">
            <center>
              <table align="center" border="0" cellpadding="0" cellspacing="0" id="bodyTable" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding:0;background-color:#FFF;height:100%;margin:0;width:100%">
                <tbody>
                  <tr>
                    <td align="center" id="bodyCell" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding-top:50px;padding-left:20px;padding-bottom:20px;padding-right:20px;border-top:0;height:100%;margin:0;width:100%">
                      <!--[if !mso]><!-->
                      <div class="templateContainer" style="border:1px none #aaa;border-radius:45px 0px 45px 0px;background: linear-gradient(to right, #fff 0%, #fff 100%);display: table; width:600px">
                        <div class="templateContainerInner" style="padding:0">
                          <!--<![endif]-->
                    <!--[if mso]>
                      <table border="0" cellpadding="0" cellspacing="0" class="templateContainer"  width="600" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                      <tbody>
                        <tr>
                          <td class="templateContainerInner" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                            <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                              <tr>
                                <td align="center" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                  <table border="0" cellpadding="0" cellspacing="0" class="templateRow" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                    <tbody>
                                      <tr>
                                        <td class="rowContainer kmFloatLeft" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmTextBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                            <tbody class="kmTextBlockOuter">
                                              <tr>
                                                <td class="kmTextBlockInner" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmTextContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                                    <tbody>
                                                      <tr>
                                                        <td class="kmTextContent" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;color:#000;font-family:Helvetica, Arial;font-size:14px;line-height:150%;text-align:left;padding-top:9px;padding-bottom:9px;padding-left:18px;padding-right:18px;">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmImageBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%">
                                            <tbody class="kmImageBlockOuter">
                                              <tr>
                                                <td class="kmImageBlockInner" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding:9px;" valign="top">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmImageContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%">
                                                    
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmTextBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                            <tbody class="kmTextBlockOuter">
                                              <tr>
                                                <td class="kmTextBlockInner" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmTextContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                                    <tbody>
                                                      <tr>
                                                          <td class="kmTextContent" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;color:#000;font-family:Helvetica, Arial;font-size:14px;line-height:150%;text-align:left;padding-top:9px;padding-bottom:9px;padding-left:18px;padding-right:18px;">
                                                              <span style="color:#000000;"></span>
                                                              <!-- Your Content As below -->

                                                              <p style="margin:0;text-align: center;background: rgba(252, 120, 52, 1);color: white;padding: 25px;border-radius: 5px 5px 0 0;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size: 1.6rem;font-weight: 600;">Email Verification</span></span></p>

                                                              <p style="margin:0;padding-bottom:1em;padding-top: 1em;font-size: 1.2rem;font-weight: 600;color: rgba(252, 120, 52, 1);">
                                                                  Hello, ${result.first_name + ' ' + result.last_name}!
                                                              </p>

                                                              <p style="margin:0;padding-bottom:1em;color: #2a2a2a;">
                                                                  Please verify your email by click on verify button.
                                                              </p>

                                                              <div style="padding-bottom: 3em;padding-top: 1em;">

                                                                  <a style="background-color: rgba(252, 120, 52, 1); color: white; border: none; box-shadow: none; font-size: 16px; font-weight: 500; border-radius: 5px; padding: 12px 20px; cursor: pointer; text-decoration: none; text-align: center;" href="${result.url}">
                                                                      Verify
                                                                  </a>

                                                              </div>

                                                              <p style="margin:0;text-align: center;background: #f0eff4;color: #878787;padding: 10px;border-radius: 0 0px 5px 5px;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size: 11px;">This is an automated message, please do not reply. For assistance, contact support@task.com.</span></span></p>
                                                          </td>
                                                      </tr>
                                                    </tbody>
                                                  
                                                 
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if !mso]><!-->
                          </div>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </body>
      </html>
    `;
    return template;
}
