import { useEffect } from "react";
import { ISaleBeat, IPersonalDetailsData } from "../../../redux/types";

interface IProps {
  data: any;
  personal: any;
  date: {
    day: string;
    month: string;
    year: number;
    dayName: string;
    monthName: string;
  };
  signature: string;
}

const Exclusive = ({ data, personal, date, signature }: IProps) => {
  useEffect(() => {
    // console.log("data", data);
    // console.log("personal", personal);
    // console.log("date", date);
    // console.log("sig", signature);
  });

  const render = (text: string) => {
    return text
      ? `<span class="dynamic correct">${text}</span>`
      : `<span class="dynamic">______</span>`;
  };

  const renderSignature = () => {
    return signature
      ? `<img class="signature" src="data:image/jpeg;base64,${signature}" />`
      : signature === undefined
      ? "<div>Loading...</div>"
      : "";
  };

  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title> ${data?.beat} ${
    data?.licension?.name
  } rights license agreement</title>
      <style>
        html {
          font-size: 14px;
        }

        .licension {
          padding: 2rem 3rem;
          font-size: 1rem;
          line-height: 1.75rem;
          font-family: 'Helvetica Neue', 'Helvetica';
          color: black;
        }

        h1 {
          font-size: 1.6rem;
          font-weight: bold;
          margin: 2rem 0px;
        }

        h2 {
          font-size: 1.275rem;
          margin-top: 1.75rem;
          margin-bottom: 0.675rem;
        }

        table {
          width: 100%;
          text-align: left;
        }

        .heading td {
          background: #eee;
          font-weight: 600;
          padding: 0.5rem 1rem;
        }
  
        .item td {
          border-bottom: 1px solid #eee;
          padding: 0.5rem 1rem;
        }

        .heading td:nth-of-type(2),
        .item td:nth-of-type(2) {
          text-align: left;
        }

        .signature-field td {
          padding: 3rem 0rem 1.5rem;
        }

        .signature-field:last-of-type td {
          padding-bottom: 8rem;
        }

        .signature {
          width: 15rem;
          margin-top: 1rem;
        }
      </style>
    </head>
   <body>
      <div class="licension">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    
                  </td>
                  <td style="text-align: right">Date: ${date.day}.${
    date.month
  }.${date.year}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h1>
                    ${render(data?.beat)} 
                    ${render(data?.licension?.name)} 
                    rights license agreement
                  </h1>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  This licence agreement is made on 
                  ${date.dayName} 
                  ${date.day}th of 
                  ${date.monthName} 
                  ${date.year}
                  ("Effective Date") by and between 
                  ${render(data?.client?.realname)} 
                  (hereinafter referred
                  to as the "Licensee") also, if applicable, professionally known
                  as 
                  ${render(data?.client?.name)}
                  , whose living country is 
                  ${render(data?.client?.country)}
                  , and
                  ${render(personal?.name)}
                  ${render(personal?.surname)}
                   (hereinafter referred to as the "Licensor")
                  also, if applicable, professionally known as 
                  ${render(personal?.stageName)}
                  , whose living country is 
                  ${render(personal?.country)}
                  . Licensor
                  warrants that it controls the mechanical rights in and to the
                  copyrighted musical works entitled 
                  ${render(data?.beat)}</span?
                  ("Composition") as of
                  and prior to the date first written above. The Composition,
                  including the music thereof, was composed by  
                  <span class="dynamic"> ${render(personal?.name)} 
                  ${render(personal?.surname)} 
                  ("Songwriter") managed under the Licensor.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Master Use</h2>
                  The Licensor hereby grants to License an exclusive license (this
                  "License") to record vocal synchronization to the Composition
                  partly or in its entirety and substantially in its original form
                  ("Master Recording").
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Mechanical Rights</h2>
                  The Licensor hereby grants to Licensee an exclusive license to
                  use Master Recording in the reproduction, duplication,
                  manufacture, and distribution of phonograph records, cassette
                  tapes, compact disk, digital downloads, other miscellaneous
                  audio and digital recordings, and any lifts and versions thereof
                  (collectively, the "Recordings", and individually, a
                  "Recordings") worldwide for unlimited copies of such Recordings
                  or any combination of such Recordings, condition upon the
                  payment to the Licensor a sum of 
                  ${render(data?.price)} 
                  ${render(data?.currency?.split("-")[1])}
                  , receipt of
                  which is confirmed.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Performance Rights</h2>
                  The Licensor here by grants to Licensee an exclusive license to
                  use the Master Recording in unlimited for-profit performances,
                  shows, or concerts.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Broadcast Rights</h2>
                  The Licensor hereby grants to Licensee an exclusive licence to
                  broadcast or air the Master Recording in unlimited amounts of
                  radio stations.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Credit</h2>
                  Licensee shall acknowledge the original authorship of the
                  Composition appropriately and reasonably in all media and
                  performance formats under the name "Empe Beats" in writing where
                  possible and vocally otherwise.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Consideration</h2>
                  In consideration for the rights granted under this agreement,
                  Licensee shall pay to licensor the sum of $79.99 US dollars and
                  other good and valuable consideration, payable to "Maciej
                  Maciborek", receipt of which is hereby acknowledged. If the
                  Licensee fails to account to the Licensor, timely complete the
                  payments provided for hereunder, or perform its other
                  obligations hereunder, including having insufficient bank
                  balance, the licensor shall have the right to terminate License
                  upon written notice to the Licensee. Such termination shall
                  render the recording, manufacture and/or distribution of
                  Recordings for which monies have not been paid subject to and
                  actionable infringements under applicable law, including,
                  without limitation, the United States Copyright Act, as amended.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Delivery</h2>

                  The Composition shall be delivered via email to an email address
                  that Licensee provided when making their payment to Licensor.
                  Licensee shall receive an email containing an attachment or link
                  from which they can download the Composition.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Audio Samples</h2>
                  3rd party sample clearance is the responsibility of the
                  Licensee.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Indemnification</h2>
                  Accordingly, Licensee agrees to indemnify and hold Licensor
                  harmless from and against any and all claims, losses, damages,
                  costs, expenses, including, without limitation, reasonable
                  attorney's fees, arising of or resulting from a claimed breach
                  of any of Licensee's representations, warranties or agreements
                  hereunder.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Miscellaneous</h2>
                  This license is non-transferable and is limited to the
                  Composition specified above, constitutes the entire agreement
                  between the Licensor and the Licensee relating to the
                  Composition, and shall be binding upon both the Licensor and the
                  Licensee and their respective successors, assigns, and legal
                  representatives.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Governing Law</h2>
                  This License is governed by and shall be construed under the law
                  of the State of (not known), Poland, without regard to the
                  conflicts of laws principles thereof.
                </tr>
              </table>
            </td>
          </tr>

          <tr class="info">
            <td colspan="2">
              <table>
                <tr>
                  <h2>Publishing</h2>
                  ${render(data?.client?.realname)}
                  , owns 50% of publishing rights. </br>
                   ${render(personal?.name)} 
                   ${render(personal?.surname)} 
                   , owns 50% of publishing rights. </br>
                  </br>
                  Finished audio recording by Licensee
                  of audio release can distribute to music supervisors for
                  consideration of synchronization licensing. Only the recording
                  artist or recording company can monetize with this license. This
                  is not a synchronization license for music supervisors of the
                  TV, Film and Video game industry.
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <h2 class="summary-title">Summary</h2>
            </td>
          </tr>
          <tr class="heading">
            <td>Beat</td>
            <td>Price</td>
          </tr>
          <tr class="item">
            <td> ${render(data?.beat)}</td>
            <td>
            ${render(data?.price)}
            ${render(data?.currency?.split("-")[0])}
            </td>
          </tr>

          <tr class="signature-field">
            <td>
            Licensor sign: 
            ${renderSignature()}
            </td>
            <td>Date: ${date.day}.${date.month}.${date.year}</td>
          </tr>

          <tr class="signature-field">
              <td>Licensee sign:</td>
              <td>Date:</td>
          </tr>
        </table>
        <br />
      </div>
    </body>
  </html>
  `;
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default Exclusive;
