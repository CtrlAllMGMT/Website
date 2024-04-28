const db = require('../models');
const generateEInvoice = require('../utils/einvoiceGenerator');

exports.generateInvoice = async (invoiceData) => {
  try {
    // Generate e-invoice XML
    const einvoiceXML = generateEInvoice(invoiceData);

    // Save invoice data to the database
    const newInvoice = await db.Invoice.create({
      ...invoiceData,
      einvoiceXML,
      invoiceNumber: generateUniqueInvoiceNumber(),
    });

    return newInvoice;
  } catch (error) {
    throw new Error('Failed to generate invoice');
  }
};

exports.getAllInvoices = async () => {
  try {
    const invoices = await db.Invoice.findAll();
    return invoices;
  } catch (error) {
    throw new Error('Failed to fetch invoices');
  }
};

exports.getInvoiceById = async (invoiceId) => {
  try {
    const invoice = await db.Invoice.findByPk(invoiceId);
    return invoice;
  } catch (error) {
    throw new Error('Failed to fetch invoice');
  }
};

exports.updateInvoiceStatus = async (invoiceId, updatedStatus) => {
  try {
    const invoice = await db.Invoice.findByPk(invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    invoice.status = updatedStatus;
    await invoice.save();

    return invoice;
  } catch (error) {
    throw new Error('Failed to update invoice status');
  }
};

function generateUniqueInvoiceNumber() {
  // Implement your logic to generate a unique invoice number
  return 'INV-' + Date.now();
}