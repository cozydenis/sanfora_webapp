# Admin Dashboard Guide

Welcome to the Sanfora Time Pieces Admin Dashboard! This guide will help you manage your inventory easily.

## Accessing the Admin Dashboard

1. Navigate to: `https://your-domain.com/admin/login`
2. Enter the admin password
3. Click "Login"

**Important**: Set a strong password in the `ADMIN_PASSWORD` environment variable before going live!

## Managing Products

### View All Products

After logging in, you'll see the **Inventory Management** dashboard with:
- A list of all your products
- Filter tabs (All, Watches, Perfumes)
- Product details (ID, Title, Category, Price, Collections)

### Add a New Product

1. Click the **"Add Product"** button in the top right
2. Fill out the form:

#### Basic Information (Required)
- **Product ID**: Unique identifier (e.g., `w001` for watches, `p001` for perfumes)
- **Title**: Product name (e.g., "Rolex Submariner Date")
- **URL Slug**: Auto-generated from title, used in the website URL
- **Price**: Leave empty for "Price on Application" (POA)
- **Description (German)**: Product description in German
- **Description (English)**: Product description in English
- **Image URLs**: Add image paths, one per line (see Image Upload section below)

#### Collections
Select which collections to add the product to:
- **Featured**: Shows on homepage
- **New In**: Shows in "New In" section

#### Watch-Specific Fields
If you selected "Watch", fill out:
- Reference Number (e.g., "116610LN")
- Year (e.g., "2018")
- Condition (e.g., "Excellent", "Unworn")
- Box & Papers (e.g., "Complete Set")
- Case Size (e.g., "40mm")
- Movement (e.g., "Automatic Cal. 3135")

#### Perfume-Specific Fields
If you selected "Perfume", fill out:
- Size (e.g., "100ml")
- Concentration (e.g., "Eau de Parfum")
- Top Notes, Heart Notes, Base Notes
- Gender (Unisex, Men, Women)

3. Click **"Add Product"** to save

### Edit a Product

1. In the dashboard, find the product you want to edit
2. Click **"Edit"** in the Actions column
3. Update any fields you want to change
4. Click **"Update Product"** to save

**Note**: You cannot change the category (Watch/Perfume) after creation

### Delete a Product

1. In the dashboard, find the product you want to delete
2. Click **"Delete"** in the Actions column
3. Confirm the deletion

**Warning**: This action cannot be undone!

## Uploading Images

### Method 1: Using Image URLs
1. Upload your images to the `/public/products/watches/` or `/public/products/perfumes/` folder
2. In the product form, add the image paths like this:
   ```
   /products/watches/rolex-submariner-1.jpg
   /products/watches/rolex-submariner-2.jpg
   /products/watches/rolex-submariner-3.jpg
   ```

### Method 2: Using the Upload API
Future versions will include a drag-and-drop image uploader in the form. For now, you can upload images using FTP or file manager access to the server.

## Tips & Best Practices

### Product IDs
- Use a consistent naming scheme:
  - Watches: `w001`, `w002`, `w003`, etc.
  - Perfumes: `p001`, `p002`, `p003`, etc.
- Never reuse a Product ID

### Image Guidelines
- Use high-quality images (at least 1000px wide)
- Use multiple angles (front, side, back, detail shots)
- Keep file sizes reasonable (under 500KB per image)
- Use descriptive filenames (e.g., `rolex-submariner-front.jpg`)

### Pricing
- Enter prices without currency symbols (e.g., `12500` not `€12,500`)
- Leave price empty for "Price on Application" products
- The website will automatically format prices with € symbol

### Descriptions
- **German First**: Your primary market is German-speaking
- Write engaging descriptions (2-3 sentences minimum)
- Highlight key features and condition
- Mention any special characteristics or provenance

### Collections
- **Featured**: Use for your best pieces (homepage visibility)
- **New In**: Add new arrivals here, remove when no longer new
- A product can be in multiple collections

## Security

### Changing the Admin Password
1. Ask your developer to set a custom password in the environment variables
2. The password is stored in: `ADMIN_PASSWORD` (server-side only)
3. Never share your admin password

### Logging Out
Always click **"Logout"** when done to keep your inventory secure.

## Troubleshooting

### "Product not found" error
- Check that the Product ID is correct
- Ensure you saved the product successfully

### Images not showing
- Verify the image path is correct (starts with `/products/`)
- Check that the image file exists in the public folder
- Ensure image filename matches exactly (case-sensitive)

### Changes not appearing on website
- Refresh your browser (Cmd/Ctrl + Shift + R)
- Clear browser cache if needed
- Wait a few seconds for the changes to save

## Need Help?

Contact your web developer if you encounter any issues or need additional features.

---

**Version**: 1.0
**Last Updated**: 2026-03-15
