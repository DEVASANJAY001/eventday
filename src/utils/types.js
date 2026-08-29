/**
 * This file serves as a reference and documentation for the data models
 * that will be loaded from the backend/database in subsequent rounds.
 * 
 * Keep this structure in mind when binding props or defining database schemas.
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {string} category
 * @property {number} rating
 * @property {number} stock
 * @property {string} [description]
 * @property {string} [sku]
 * @property {string[]} [sizes]
 * @property {string[]} [colors]
 * @property {number} [discount]
 * @property {string} [status] // 'Active' | 'Draft' | 'Out of Stock'
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {Product} product
 * @property {number} quantity
 * @property {string} [selectedSize]
 * @property {string} [selectedColor]
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} date
 * @property {number} amount
 * @property {string} paymentStatus // 'Paid' | 'Unpaid' | 'Refunded'
 * @property {string} orderStatus // 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
 * @property {Object} shippingAddress
 * @property {CartItem[]} items
 */

/**
 * @typedef {Object} Customer
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} joinDate
 * @property {number} orderCount
 * @property {string} status // 'Active' | 'Suspended'
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {string} image
 * @property {string} status // 'Active' | 'Draft'
 */

export const EMPTY_OBJECT = Object.freeze({});
