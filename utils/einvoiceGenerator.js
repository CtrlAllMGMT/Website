const xml2js = require('xml2js');
const QRCode = require('qrcode');

const generateEInvoice = async (invoiceData) => {
  // Construct the e-invoice XML structure based on the invoice data
  const invoice = {
    issuerInfo: {
      vatRegistrationNumber: 'YOUR_VAT_REGISTRATION_NUMBER',
      companyName: 'YOUR_COMPANY_NAME',
      companyAddress: 'YOUR_COMPANY_ADDRESS',
      companyCountry: 'YOUR_COMPANY_COUNTRY',
    },
    receiverInfo: {
      name: invoiceData.customerName,
      address: invoiceData.customerAddress,
      country: invoiceData.customerCountry,
    },
    invoiceDetails: {
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceDate: new Date().toISOString().slice(0, 10),
      invoiceTotal: calculateInvoiceTotal(invoiceData.lineItems),
      taxAmount: calculateTaxAmount(invoiceData.lineItems),
      invoiceLines: invoiceData.lineItems,
    },
  };

  // Convert the invoice object to XML
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(invoice);

  // Generate QR code for the invoice
  const qrCodeData = JSON.stringify(invoice);
  const qrCodeBuffer = await QRCode.toDataURL(qrCodeData);

  // Combine the XML and QR code into the final e-invoice
  const einvoice = `${xml}\n<QRCode>${qrCodeBuffer}</QRCode>`;

  return einvoice;
};

// Helper functions
function calculateInvoiceTotal(lineItems) {
  // Calculate the total invoice amount based on line items
  return lineItems.reduce((total, item) => total + item.total, 0);
}

function calculateTaxAmount(lineItems) {
  // Calculate the tax amount based on line items and tax rate
  const taxRate = 0.15; // 15% VAT rate in KSA
  return lineItems.reduce((total, item) => total + item.total * taxRate, 0);