import { a0 as t } from "./vendor_react-AVDGa64O.js";
import { F as FieldType } from "./App-D50-L2s0.js";
const getLocationSettingsFormFields = () => [
  {
    keyName: "timezone",
    name: "timezone",
    data: {
      type: FieldType.Select,
      label: t("Vremenska zona"),
      options: [
        { value: "Europe/Belgrade", text: "Europe/Belgrade (GMT+1)" },
        { value: "Europe/London", text: "Europe/London (GMT+0)" },
        { value: "Europe/Paris", text: "Europe/Paris (GMT+1)" },
        { value: "Europe/Berlin", text: "Europe/Berlin (GMT+1)" },
        { value: "Europe/Rome", text: "Europe/Rome (GMT+1)" },
        { value: "Europe/Madrid", text: "Europe/Madrid (GMT+1)" },
        { value: "America/New_York", text: "America/New_York (GMT-5)" },
        { value: "America/Los_Angeles", text: "America/Los_Angeles (GMT-8)" },
        { value: "Asia/Tokyo", text: "Asia/Tokyo (GMT+9)" },
        { value: "Asia/Shanghai", text: "Asia/Shanghai (GMT+8)" },
        { value: "Australia/Sydney", text: "Australia/Sydney (GMT+10)" }
      ]
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "autoConfirmReservations",
    name: "autoConfirmReservations",
    data: {
      type: FieldType.Switch,
      label: t("Automatsko potvrđivanje rezervacija")
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "pauseBetweenReservations",
    name: "pauseBetweenReservations",
    data: {
      type: FieldType.Number,
      label: t("Pauza između rezervacija (minuti)")
    },
    gridSize: { size: "12" }
  }
];
const getLocationEditSettingsFormFields = () => {
  return [
    {
      keyName: "wifiPassword",
      name: "wifiPassword",
      data: {
        type: FieldType.Text,
        label: t("WiFi lozinka")
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "pwaMetadata",
      keyNameChild: "name",
      name: "pwaMetadata.name",
      data: {
        type: FieldType.Text,
        label: t("PWA Naziv")
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "pwaMetadata",
      keyNameChild: "shortName",
      name: "pwaMetadata.shortName",
      data: {
        type: FieldType.Text,
        label: t("PWA Kratak naziv")
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "pwaMetadata",
      keyNameChild: "themeColor",
      name: "pwaMetadata.themeColor",
      data: {
        type: FieldType.Text,
        label: t("PWA Boja teme")
      },
      gridSize: { size: "6" }
    },
    {
      keyName: "pwaMetadata",
      keyNameChild: "backgroundColor",
      name: "pwaMetadata.backgroundColor",
      data: {
        type: FieldType.Text,
        label: t("PWA Boja pozadine")
      },
      gridSize: { size: "6" }
    },
    {
      keyName: "pwaMetadata",
      keyNameChild: "scope",
      name: "pwaMetadata.scope",
      data: {
        type: FieldType.Text,
        label: t("PWA Scope")
      },
      gridSize: { size: "12" }
    }
  ];
};
export {
  getLocationSettingsFormFields as a,
  getLocationEditSettingsFormFields as g
};
