import { useEffect, useState } from "react";
import CustomCurrency from "../CustomCurrency";

const currency_list = {
  AFA: "Afghan Afghani",
  ALL: "Albanian Lek",
  DZD: "Algerian Dinar",
  AOA: "Angolan Kwanza",
  ARS: "Argentine Peso",
  AMD: "Armenian Dram",
  AWG: "Aruban Florin",
  AUD: "Australian Dollar",
  AZN: "Azerbaijani Manat",
  BSD: "Bahamian Dollar",
  BHD: "Bahraini Dinar",
  BDT: "Bangladeshi Taka",
  BBD: "Barbadian Dollar",
  BYR: "Belarusian Ruble",
  BEF: "Belgian Franc",
  BZD: "Belize Dollar",
  BMD: "Bermudan Dollar",
  BTN: "Bhutanese Ngultrum",
  BTC: "Bitcoin",
  BOB: "Bolivian Boliviano",
  BAM: "Bosnia-Herzegovina Convertible Mark",
  BWP: "Botswanan Pula",
  BRL: "Brazilian Real",
  GBP: "British Pound Sterling",
  BND: "Brunei Dollar",
  BGN: "Bulgarian Lev",
  BIF: "Burundian Franc",
  KHR: "Cambodian Riel",
  CAD: "Canadian Dollar",
  CVE: "Cape Verdean Escudo",
  KYD: "Cayman Islands Dollar",
  XOF: "CFA Franc BCEAO",
  XAF: "CFA Franc BEAC",
  XPF: "CFP Franc",
  CLP: "Chilean Peso",
  CNY: "Chinese Yuan",
  COP: "Colombian Peso",
  KMF: "Comorian Franc",
  CDF: "Congolese Franc",
  CRC: "Costa Rican ColÃ³n",
  HRK: "Croatian Kuna",
  CUC: "Cuban Convertible Peso",
  CZK: "Czech Republic Koruna",
  DKK: "Danish Krone",
  DJF: "Djiboutian Franc",
  DOP: "Dominican Peso",
  XCD: "East Caribbean Dollar",
  EGP: "Egyptian Pound",
  ERN: "Eritrean Nakfa",
  EEK: "Estonian Kroon",
  ETB: "Ethiopian Birr",
  EUR: "Euro",
  FKP: "Falkland Islands Pound",
  FJD: "Fijian Dollar",
  GMD: "Gambian Dalasi",
  GEL: "Georgian Lari",
  DEM: "German Mark",
  GHS: "Ghanaian Cedi",
  GIP: "Gibraltar Pound",
  GRD: "Greek Drachma",
  GTQ: "Guatemalan Quetzal",
  GNF: "Guinean Franc",
  GYD: "Guyanaese Dollar",
  HTG: "Haitian Gourde",
  HNL: "Honduran Lempira",
  HKD: "Hong Kong Dollar",
  HUF: "Hungarian Forint",
  ISK: "Icelandic KrÃ³na",
  INR: "Indian Rupee",
  IDR: "Indonesian Rupiah",
  IRR: "Iranian Rial",
  IQD: "Iraqi Dinar",
  ILS: "Israeli New Sheqel",
  ITL: "Italian Lira",
  JMD: "Jamaican Dollar",
  JPY: "Japanese Yen",
  JOD: "Jordanian Dinar",
  KZT: "Kazakhstani Tenge",
  KES: "Kenyan Shilling",
  KWD: "Kuwaiti Dinar",
  KGS: "Kyrgystani Som",
  LAK: "Laotian Kip",
  LVL: "Latvian Lats",
  LBP: "Lebanese Pound",
  LSL: "Lesotho Loti",
  LRD: "Liberian Dollar",
  LYD: "Libyan Dinar",
  LTL: "Lithuanian Litas",
  MOP: "Macanese Pataca",
  MKD: "Macedonian Denar",
  MGA: "Malagasy Ariary",
  MWK: "Malawian Kwacha",
  MYR: "Malaysian Ringgit",
  MVR: "Maldivian Rufiyaa",
  MRO: "Mauritanian Ouguiya",
  MUR: "Mauritian Rupee",
  MXN: "Mexican Peso",
  MDL: "Moldovan Leu",
  MNT: "Mongolian Tugrik",
  MAD: "Moroccan Dirham",
  MZM: "Mozambican Metical",
  MMK: "Myanmar Kyat",
  NAD: "Namibian Dollar",
  NPR: "Nepalese Rupee",
  ANG: "Netherlands Antillean Guilder",
  TWD: "New Taiwan Dollar",
  NZD: "New Zealand Dollar",
  NIO: "Nicaraguan CÃ³rdoba",
  NGN: "Nigerian Naira",
  KPW: "North Korean Won",
  NOK: "Norwegian Krone",
  OMR: "Omani Rial",
  PKR: "Pakistani Rupee",
  PAB: "Panamanian Balboa",
  PGK: "Papua New Guinean Kina",
  PYG: "Paraguayan Guarani",
  PEN: "Peruvian Nuevo Sol",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  QAR: "Qatari Rial",
  RON: "Romanian Leu",
  RUB: "Russian Ruble",
  RWF: "Rwandan Franc",
  SVC: "Salvadoran ColÃ³n",
  WST: "Samoan Tala",
  SAR: "Saudi Riyal",
  RSD: "Serbian Dinar",
  SCR: "Seychellois Rupee",
  SLL: "Sierra Leonean Leone",
  SGD: "Singapore Dollar",
  SKK: "Slovak Koruna",
  SBD: "Solomon Islands Dollar",
  SOS: "Somali Shilling",
  ZAR: "South African Rand",
  KRW: "South Korean Won",
  XDR: "Special Drawing Rights",
  LKR: "Sri Lankan Rupee",
  SHP: "St. Helena Pound",
  SDG: "Sudanese Pound",
  SRD: "Surinamese Dollar",
  SZL: "Swazi Lilangeni",
  SEK: "Swedish Krona",
  CHF: "Swiss Franc",
  SYP: "Syrian Pound",
  STD: "São Tomé and Príncipe Dobra",
  TJS: "Tajikistani Somoni",
  TZS: "Tanzanian Shilling",
  THB: "Thai Baht",
  TOP: "Tongan Pa'anga",
  TTD: "Trinidad & Tobago Dollar",
  TND: "Tunisian Dinar",
  TRY: "Turkish Lira",
  TMT: "Turkmenistani Manat",
  UGX: "Ugandan Shilling",
  UAH: "Ukrainian Hryvnia",
  AED: "United Arab Emirates Dirham",
  UYU: "Uruguayan Peso",
  USD: "US Dollar",
  UZS: "Uzbekistan Som",
  VUV: "Vanuatu Vatu",
  VEF: "Venezuelan BolÃvar",
  VND: "Vietnamese Dong",
  YER: "Yemeni Rial",
  ZMK: "Zambian Kwacha",
};

interface IInput {
  target: {
    value: string;
    checked: Boolean;
  };
}

interface IProps {
  submitForm: (data: string[]) => void;
  currencies: any;
  setCurrencies: any;
  addCurrency: any;
}

function CurrencySettingsForm({
  submitForm,
  currencies,
  setCurrencies,
  addCurrency,
}: IProps) {
  const [canUpdate, setCanUpdate] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const isChecked = (key: string) =>
    !!(
      currencies &&
      currencies.map((el: string) => el.split("-")[0]).indexOf(key) + 1
    );

  const capitalize = (s) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const changed = ({ target: { value, checked } }: IInput) => {
    if (checked) {
      setCurrencies((prevState: string[]) => [...prevState, value]);
    } else {
      setCurrencies(currencies.filter((item: string) => item !== value));
    }

    setCanUpdate(true);
  };

  const remove = (key: string) => {
    setCurrencies(currencies.filter((item: string) => item !== key));

    const input = document.getElementById(
      "currency-" + key,
    ) as HTMLInputElement;

    if (input) {
      input.checked = false;
    }
    setCanUpdate(true);
  };

  const add = ({ name, shortcode }) => {
    const currency = `${shortcode.toUpperCase()}-${capitalize(name)}`;
    if (currencies.includes(currency)) {
      setMessage("Currency you trying to add is already in usage");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }
    addCurrency(currency);
  };

  useEffect(() => {
    if (canUpdate) {
      submitForm(currencies);
    }
  }, [currencies]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="font-bold mt-2">Add</h3>
        <CustomCurrency addCurrency={add} />
        {message && <p>{message}</p>}
      </div>

      <div>
        <h3 className="font-bold mt-2">Select</h3>
        <form>
          <fieldset className="h-96 overflow-auto">
            {Object.keys(currency_list).map((key) => {
              return (
                <div key={key}>
                  <input
                    onChange={changed}
                    type="checkbox"
                    id={`currency-${key}`}
                    value={`${key}-${currency_list[key]}`}
                    checked={isChecked(key)}
                  />
                  <label htmlFor={"currency-" + key}>
                    <strong>{key}</strong>
                    {currency_list[key]}
                  </label>
                </div>
              );
            })}
          </fieldset>
        </form>
      </div>

      <div>
        <h3 className="font-bold mt-2">Used</h3>
        <ul>
          {currencies &&
            currencies.map((el) => (
              <li key={Math.random()}>
                {el.split("-")[0]} - {el.split("-")[1]}
                <button
                  onClick={() => remove(el)}
                  className="text-red-600 p-1 font-bold text-xl ml-2"
                >
                  -
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CurrencySettingsForm;
