const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { OrderSyncSettingsPage } = require('../pages/ultimateSettings');
const fs = require('fs');
const GoogleSheetAPI = require('../../test-utils/gsApiCall');

const productData = JSON.parse(fs.readFileSync('./tests/utilities/productdata.json', 'utf8'));
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const AUTH_CONFIG_PATH = process.env.SERVICE_ACCOUNT_UPLOAD_FILE;
let googleSheetAPI;

test.beforeAll(() => {
    googleSheetAPI = new GoogleSheetAPI(AUTH_CONFIG_PATH);
});

test.describe('Ultimate Settings Toggle Validation', () => {
    let loginPage;
    let ultimateSettingsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        ultimateSettingsPage = new OrderSyncSettingsPage(page);

        await loginPage.navigate();
        await loginPage.login();
        await ultimateSettingsPage.navigateToSettings();
    });

    test('Ultimate Settings Sync Custom Order Status Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('syncCustomOrderStatus');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Order_Status);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Order Status");
        console.log('Display Custom Order Status row read from sheet:', rows);
    });

    test('Ultimate Settings Display Total Items Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayTotalItems');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Total_Items);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Total Items");
        console.log('Display Total Items row read from sheet:', rows);
    });

    test('Ultimate Settings Sync Product SKU Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('syncProductSkuUltimateNew');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Product_SKU);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Product SKU");
        console.log('Sync Product SKU row read from sheet:', rows);
    });

    test('Ultimate Settings Display Total Price Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayTotalPrice');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Total_Price);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Total Price");
        console.log('Display Total Price row read from sheet:', rows);
    });

    test('Ultimate Settings Display Total Discount Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayTotalDiscount');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Total_Discount);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Total Discount");
        console.log('Display Total Discount row read from sheet:', rows);
    });

    test('Ultimate Settings Show Individual Product Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('showIndividualProduct');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Show_Individual_Products);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Guzman Ltd (qty: 5,price: 43.45)");
        console.log('Show Individual Product row read from sheet:', rows);
    });

    test('Ultimate Settings Display Billing Address Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayBillingAddress');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Billing_Details);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Billing Details");
        console.log('Display Billing Address row read from sheet:', rows);
    });

    test('Ultimate Settings Display Shipping Address Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayShippingAddress');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Shipping_Details);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Shipping Details");
        console.log('Display Shipping Address row read from sheet:', rows);
    });

    test('Ultimate Settings Display Order Date Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayOrderDateUltimate');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Order_Date);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Order Date");
        console.log('Display Order Date row read from sheet:', rows);
    });

    test('Ultimate Settings Display Payment Method Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayPaymentMethod');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Payment_Method);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Payment Method");
        console.log('Display Payment Method row read from sheet:', rows);
    });

    test('Ultimate Settings Display Customer Note Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayCustomerNoteUltimate');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Customer_Note);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Customer Note");
        console.log('Display Customer Note row read from sheet:', rows);
    });

    test('Ultimate Settings Display Order Note Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayOrderNoteUltimate');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Order_Note);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Order Note");
        console.log('Display Order Note row read from sheet:', rows);
    });

    test('Ultimate Settings Display Order Placement Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayOrderPlacement');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Order_Placed_by);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Order Placed by");
        console.log('Display Order Placement row read from sheet:', rows);
    });

    test('Ultimate Settings Display Order URL Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('displayOrderUrlUltimate');
        await ultimateSettingsPage.saveChanges();

        const rows = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE.Order_URL);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0][0]).toBe("Order URL");
        console.log('Display Order URL row read from sheet:', rows);
    });

    test('Ultimate Settings Sync Order Custom Fields Validation', async ({ page }) => {
        await ultimateSettingsPage.toggleOption('syncOrderCustomFields');
        
        await ultimateSettingsPage.clearCustomFields();
        
        await page.getByRole('option', { name: '_billing_address_index' }).click();
        await page.getByText('××_billing_address_index').click();
        await page.getByRole('option', { name: '_shipping_address_index' }).click();
        await ultimateSettingsPage.saveChanges();
    
        const rowsBilling = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE._billing_address_index);
        const rowsShipping = await googleSheetAPI.readFromSheet(SPREADSHEET_ID, productData.SETTINGS_TOOGLE_SHEET_RANGE._shipping_address_index);
    
        expect(rowsBilling.length).toBeGreaterThan(0);
        expect(rowsBilling[0][0]).toBe("_billing_address_index");
        
        expect(rowsShipping.length).toBeGreaterThan(0);
        expect(rowsShipping[0][0]).toBe("_shipping_address_index");
    
        console.log('Sync Order Custom Fields row read from sheet:', rowsBilling, rowsShipping);
    });
});