import { useEffect } from "react";
import { ISaleBeat, IArtistDetailsData } from "../../../redux/types";

interface IProps {
  data: ISaleBeat;
  artist: IArtistDetailsData;
}

const Exclusive = ({ data, artist }: IProps) => {
  const { beatName, licension, currency, client } = data;
  const { name, surname, stageName, email, country, localization } = artist;

  const currenciesSign = {
    usd: "$",
    euro: "€",
    pln: "zl",
  };

  const currenciesName = {
    usd: "US Dollar",
    euro: "Euro",
    pln: "Polish zloty",
  };

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const monthName = dateObj.toLocaleString("en-us", { month: "long" });
  const dayName = dateObj.toLocaleString("en-us", { weekday: "long" });

  const prices = {
    basic: {
      usd: 999,
      pln: 999,
      euro: 999,
    },
    standard: {
      usd: 999,
      pln: 999,
      euro: 999,
    },
    premium: {
      usd: 999,
      pln: 999,
      euro: 999,
    },
    unlimited: {
      usd: 999,
      pln: 999,
      euro: 999,
    },
    exclusive: {
      usd: 999,
      pln: 999,
      euro: 999,
    },
  };

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title> ${beatName} ${licension} rights license agreement</title>
    <style>
      .licension {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica';
        color: #555;
      }

      .licension h1 {
        line-height: 1.25;
        font-size: 1.6rem;
      }
      
      .licension h2 {
        font-size: 1.2rem;
        margin-top:1rem;
        margin-bottom: 12px;
      }

      .licension .date-field {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        width: 100%;
        line-height: 0.8;
        margin-top: 60px;
        white-space: nowrap;
      }

       .licension .date-field > div:last-of-type {
         grid-column-start: 3;
       }


      .summary-title {
        margin-top: 24px;
        opacity: 0;
      }

      .margin-top {
        margin-top: 50px;
      }
      .justify-center {
        text-align: center;
      }
      .licension table {
        width: 100%;
        line-height: inherit;
        text-align: left;
      }
      .licension table td {
        padding: 5px;
        vertical-align: top;
      }
      .licension table tr td:nth-child(2) {
        text-align: right;
      }
      .licension table tr.top table td {
        padding-bottom: 20px;
      }
      .licension table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }
      .licension table tr.information table td {
        padding-bottom: 40px;
      }
      .licension table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }
      .licension table tr.details td {
        padding-bottom: 20px;
      }
      .licension table tr.item td {
        border-bottom: 1px solid #eee;
        padding: 12px 4px;
      }
        .licension table tr.item td:nth-of-type(2) {
        text-align: left;
      }
         .licension table tr.heading td:nth-of-type(2) {
        text-align: left;
      }
      .licension table tr.item.last td {
        border-bottom: none;
      }
      .licension table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="50"
                    viewBox="0 140  400 80"
                    aria-labelledby="box"
                    role="presentation"
                    class="logo"
                  >
                    <g fill="rgb(120, 120, 120)" stroke="currentColor">
                      <g>
                        <path
                          d="M71.2,148.2c0,0,47-48.3,84-46.8c0,0,17.3,0,9.9,17.2c-7.4,17.2-11.1,35.9-80.3,63.9c0,0-7.4,15.6,3.7,15.6
	s40.8-20.3,40.8-20.3s-48.2,51.5-77.9,57.7l7.4,12.5c0,0,50.7-20.3,61.8-40.6c0,0-1.2,6.2,4.9,6.2c6.2,0,32.1-15.6,35.8-20.3
	c0,0-2.5,14,4.9,14c7.4,0,18.5-6.2,26-14c0,0,2.5,12.5,8.7,10.9c6.2-1.6,23.5-15.6,23.5-15.6l-22.2,37.4c0,0-3.7,20.3,12.4,9.4
	l16.1-25c0,0,13.6,6.2,34.6-12.5c0,0,1.2,4.7,11.1,6.2c0,0,39.5,20.3,101.3-32.8c0,0,4.9-7.8-11.1-9.4c0,0-70.4,48.3-85.3,29.6
	c0,0,35.8-17.2,37.1-21.8c1.2-4.7,4.9-15.6-13.6-14c-18.5,1.6-30.9,18.7-30.9,18.7s0-20.3-33.4-4.7c0,0-4.9-14-26,7.8
	c0,0-11.1-15.6-29.7-3.1l-2.5,3.1c0,0-6.2-21.8-37.1,7.8l2.5-10.9h-7.4c0,0,217.5-35.9,242.2-25c0,0,14.8-9.4,2.5-17.2
	c0,0-218.7,12.5-223.7,21.8c0,0,17.3-10.9,14.8-40.6s-34.6-34.3-61.8-20.3s-53.1,40.6-53.1,40.6L71.2,148.2z"
                        ></path>
                        <path
                          d="M238,193.4c0,0,7.4-18.7,16.1-18.7s4.9,3.1,4.9,3.1s-11.1,17.2-21,18.7"
                        ></path>
                        <path
                          d="M282.5,183.3c0,0,6.9-14,15-14c8.1,0,4.6,2.3,4.6,2.3s-10.4,12.9-19.7,14"
                        ></path>
                        <path
                          d="M59.5,247.2c0,0-30.9,4.7-35.8-29.6s11.1-49.9,11.1-49.9H3.8c0,0-8.7-3.1,0-7.8c8.7-4.7,39.5-6.2,39.5-6.2
        s14.8-17.2,18.5-20.3s9.9,14,9.9,14l34.6,1.6c0,0,13.6,3.1-3.7,12.5s-43.3,3.1-43.3,3.1c-3.8,4.4-8.5,10.9-12.4,20.1
        c-8.3,19.8-7.1,39.1-6.2,47C47.1,236.8,53.3,242,59.5,247.2z"
                        ></path>
                        <path
                          d="M64.4,230.1c0,0-12.4,7.8-22.2,7.8s13.6,6.2,13.6,6.2l17.3-4.7L64.4,230.1z"
                        ></path>
                        <path
                          d="M39.7,233.2c0,0,13.6,4.7,14.8,6.2c1.2,1.6-11.9,1.6-13.4,0C39.7,237.9,39.7,233.2,39.7,233.2z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </td>
                <td>Date: ${day}.${month}.${year}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="info">
          <td colspan="2">
            <table>
              <tr>
                <h1>
                  ${beatName} ${licension} rights license agreement
                </h1>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="info">
          <td colspan="2">
            <table>
              <tr>
                This licence agreement is made on ${dayName} ${day}th of ${monthName} ${year}
                ("Effective Date") by and between ${
                  client?.realname
                } (hereinafter referred
                to as the "Licensee") also, if applicable, professionally known
                as ${client?.name}, whose living country is ${
    client?.country
  }, and
                ${name} ${surname} (hereinafter referred to as the "Licensor")
                also, if applicable, professionally known as ${stageName}}, whose living country is ${country}. Licensor
                warrants that it controls the mechanical rights in and to the
                copyrighted musical works entitled ${beatName} ("Composition") as of
                and prior to the date first written above. The Composition,
                including the music thereof, was composed by  ${name} ${surname}
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
                payment to the Licensor a sum of ${
                  prices[licension][currency]
                } ${"currenciesName[currency]" ?? ""}s, receipt of
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
                ${client?.realname}, owns 50% of publishing rights. </br>
                 ${name} ${surname}, owns 50% of publishing rights. </br>
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
        <tr class="heading margin-top">
          <td>Beat</td>
          <td>Price</td>
        </tr>
        <tr class="item">
          <td> ${beatName}</td>
          <td>${prices[licension][currency]}${currenciesSign[currency]}</td>
        </tr>


        <tr>
          <td class="date-field" >
              <div>Licensor sign:</div>
              <div>Date: ${day}.${month}.${year}</div>
          </td>
          
        </tr>


        <tr>
          <td class="date-field">
            <div>Licensee sign:</div>
              <div>Date:</div>
          </td>
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
