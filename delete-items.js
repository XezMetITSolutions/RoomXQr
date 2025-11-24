// Script to delete specific menu items from database
// Run this with: node delete-items.js

const API_URL = 'https://roomxqr-backend.onrender.com';
const TENANT = 'demo';

async function deleteMenuItems() {
    try {
        // First, get all menu items to find the IDs
        console.log('Fetching menu items...');
        const response = await fetch(`${API_URL}/api/menu`, {
            headers: {
                'x-tenant': TENANT
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch menu: ${response.statusText}`);
        }

        const data = await response.json();
        const menuItems = data.menuItems || data.menu || [];

        console.log(`Found ${menuItems.length} menu items`);

        // Find items to delete
        const itemsToDelete = menuItems.filter(item => {
            const name = item.name.toLowerCase().trim();
            return name.includes('karniyarik') ||
                name.includes('karnıyarık') ||
                name === 'cheeseburger' ||
                name === 'cheese burger';
        });

        console.log(`Found ${itemsToDelete.length} items to delete:`);
        itemsToDelete.forEach(item => {
            console.log(`  - ${item.name} (ID: ${item.id})`);
        });

        if (itemsToDelete.length === 0) {
            console.log('No items to delete.');
            return;
        }

        // Delete each item
        for (const item of itemsToDelete) {
            console.log(`Deleting ${item.name}...`);
            const deleteResponse = await fetch(`${API_URL}/api/menu/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'x-tenant': TENANT,
                    'Content-Type': 'application/json'
                }
            });

            if (deleteResponse.ok) {
                console.log(`✓ Deleted ${item.name}`);
            } else {
                console.error(`✗ Failed to delete ${item.name}: ${deleteResponse.statusText}`);
            }
        }

        console.log('\nDeletion complete!');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

deleteMenuItems();
