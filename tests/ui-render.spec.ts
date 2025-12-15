import { test, expect } from '@playwright/test';

test.describe('Marriage Bio-Data Builder Flow Test', () => {

    test('should complete the full bio-data creation flow', async ({ page }) => {
        // 1. Visit App
        await page.goto('http://localhost:5173');
        await expect(page).toHaveTitle(/SaathJanam/i);

        // 2. Welcome Screen -> Start
        await page.click('button:has-text("Create My Bio-Data")');

        // 3. Wizard Step 1: Basic
        await expect(page.locator('h2', { hasText: 'Basic Details' })).toBeVisible();
        await page.fill('input[name="fullName"]', 'Aditi Rao');

        const dateInput = page.locator('.react-datepicker-wrapper input');
        await dateInput.click();
        await dateInput.fill('01 Jan 1995');
        await dateInput.press('Enter');
        await page.click('button:has-text("Next")');

        // 4. Wizard Step 2: Personal
        await expect(page.locator('h2', { hasText: 'Personal Details' })).toBeVisible();
        await page.fill('input[name="height"]', '5 10');
        await page.click('button:has-text("Next")');

        // 5. Wizard Step 3: Horoscope
        await expect(page.locator('h2', { hasText: 'Horoscope Details' })).toBeVisible();
        await page.click('button:has-text("Next")');

        // 6. Wizard Step 4: Education
        await expect(page.locator('h2', { hasText: 'Education & Job' })).toBeVisible();
        await page.click('button:has-text("Next")');

        // 7. Wizard Step 5: Family (Using Sibling Modal)
        await expect(page.locator('h2', { hasText: 'Family Details' })).toBeVisible();
        // Open Modal
        await page.click('button:has-text("Add Sibling")');
        await expect(page.locator('h3', { hasText: 'Add Sibling' })).toBeVisible();
        // Fill Modal
        await page.fill('input[name="occupation"]', 'Doctor'); // Optional field
        // Submit
        await page.locator('button[type="submit"]').click();
        // Check if added to list
        await expect(page.locator('text=Brother (Unmarried)')).toBeVisible();
        await expect(page.locator('text=Doctor')).toBeVisible();

        await page.click('button:has-text("Next")');

        // 8. Wizard Step 6: Contact
        await expect(page.locator('h2', { hasText: 'Contact Details' })).toBeVisible();
        await page.fill('input[name="contactNumber"]', '9876543210');
        await page.click('button:has-text("Next")');

        // 9. Wizard Step 7: Extra (Custom Fields)
        await expect(page.locator('h2', { hasText: 'Extra Details' })).toBeVisible();
        await page.fill('input[name="label"]', 'Diet');
        await page.fill('input[name="value"]', 'Vegetarian');
        // Click Add (button with title "Add Field" or just last button in that grid)
        await page.click('button[title="Add Field"]');
        // Check if added
        await expect(page.locator('text=Diet')).toBeVisible();
        await expect(page.locator('text=Vegetarian')).toBeVisible();

        await page.click('button:has-text("Done")');

        // 10. Final Review
        await expect(page.locator('h2', { hasText: 'Final Review' })).toBeVisible();

        // Check Header Name (Aditi Rao)
        await expect(page.locator('#bio-data-content h1').first()).toHaveText('Aditi Rao');
        // Check God Icon/Text
        await expect(page.locator('#bio-data-content').first()).toContainText('Ganeshaya Namah');
        // Check Sibling
        await expect(page.locator('#bio-data-content').first()).toContainText('Brother (Unmarried) - Doctor');
        // Check Custom Field (in Personal section? No, Section default was Personal Details)
        // It should appear in Personal Details section
        await expect(page.locator('#bio-data-content').first()).toContainText('Diet');

        // Theme Switch to Divine (template circles use title)
        await page.getByTitle('Divine').click();
        await expect(page.locator('#bio-data-content').first()).toHaveClass(/theme-divine/);
    });

});
