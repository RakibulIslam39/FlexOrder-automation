const { test, expect } = require('@playwright/test');
const { OrderStatusUpdater, updatedOrders } = require('../../test-utils/updateOrderStatus');

test.describe('Google Sheets to WooCommerce Order Status Sync', () => {
    let statusUpdater;

    test.beforeAll(() => {
        statusUpdater = new OrderStatusUpdater('./tests/utilities/upload_key.json');
    });

    test('Update order status in Google Sheets', async ({ page }) => {
        const firstOrder = await statusUpdater.fetchFirstOrder('Orders!A2:Z2');
        const [orderId, , currentStatus] = firstOrder;
        console.log(`Current Status of Order ID ${orderId}: ${currentStatus}`);

        const newStatus = statusUpdater.getRandomStatus();
        await statusUpdater.updateOrderStatusInSheet(orderId, newStatus);

        const storedOrder = updatedOrders.find(order => order.id === orderId);
        expect(storedOrder.status).toBe(newStatus);

        console.log('Updated Orders Array:', updatedOrders);
    });

    test('Validate updated order status in WooCommerce', async () => {
        
        test.skip(!updatedOrders.length, 'No orders were updated in the previous test');
        const storedOrder = updatedOrders[0];

        const wooOrder = await statusUpdater.fetchOrderFromWooCommerce(storedOrder.id);
        expect(wooOrder.id).toBe(Number(storedOrder.id));
        expect(wooOrder.status).toBe(storedOrder.status.replace('wc-', ''));

        console.log(`Order ID ${storedOrder.id} status in WooCommerce: ${wooOrder.status}`);
    });
});