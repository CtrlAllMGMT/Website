const invoiceService = require('../services/invoiceService');

exports.createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
    const newInvoice = await invoiceService.generateInvoice(invoiceData);
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create invoice' });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoices' });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await invoiceService.getInvoiceById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoice' });
  }
};

exports.updateInvoiceStatus = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const updatedStatus = req.body.status;
    const updatedInvoice = await invoiceService.updateInvoiceStatus(
      invoiceId,
      updatedStatus
    );
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update invoice status' });
  }
};