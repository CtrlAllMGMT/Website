const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoiceNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  invoiceDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  customerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerCountry: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lineItems: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  invoiceTotal: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  taxAmount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  einvoiceXML: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('pending', 'paid', 'cancelled'),
    defaultValue: 'pending',
  },
});

module.exports = Invoice;