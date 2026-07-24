export const platformConfig = {
  payments: {
    provider: process.env.PAYMENT_PROVIDER || "disabled",
    iyzicoApiKey: process.env.IYZICO_API_KEY || "",
    paytrMerchantId: process.env.PAYTR_MERCHANT_ID || "",
  },
  messaging: {
    whatsappToken: process.env.WHATSAPP_ACCESS_TOKEN || "",
    smsProvider: process.env.SMS_PROVIDER || "disabled",
  },
  ai: {
    endpoint: process.env.AI_SKIN_ANALYSIS_ENDPOINT || "",
    enabled: Boolean(process.env.AI_SKIN_ANALYSIS_ENDPOINT),
  },
} as const;
