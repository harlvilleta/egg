# Harley's Fresh Eggs Shop

A modern, responsive web application for ordering fresh eggs online. Built with Next.js and Tailwind CSS, this application provides a seamless shopping experience on both desktop and mobile devices.

## Quick Start

1. **Run the Setup Script**
   ```powershell
   # Open PowerShell and run:
   .\setup.ps1
   ```
   This will:
   - Check if Node.js and npm are installed
   - Install all project dependencies
   - Create necessary directories
   - Create an initial backup of your code

2. **Start the Development Server**
   ```powershell
   npm run dev
   ```
   The application will be available at: http://localhost:3000

## Features

- 🥚 Fresh egg ordering system
- 🛒 Shopping cart functionality
- 📱 Mobile-friendly design
- 💳 Philippine Peso (₱) pricing
- 🏠 Free delivery for orders over ₱100
- 📍 Location-based services
- 🔄 Real-time cart updates
- 🎨 Modern and clean UI

## Project Structure

```
harley/
├── app/                    # Main application code
│   ├── components/        # React components
│   ├── context/          # React context providers
│   └── page.tsx          # Main page component
├── public/               # Static files
│   └── images/          # Image assets
├── setup.ps1            # Setup script
└── package.json         # Project dependencies
```

## Development

- **Adding New Features**: Create new components in the `app/components` directory
- **Styling**: Uses Tailwind CSS for styling
- **State Management**: Uses React Context for state management
- **Routing**: Uses Next.js App Router

## Backup

The setup script automatically creates a backup of your code in the `harley_backup_[timestamp]` directory. You can also manually create backups by:

1. Creating a new directory
2. Copying all files to the new directory

## Support

For any issues or questions, please:
1. Check the documentation
2. Review the code structure
3. Contact the development team

## License

This project is licensed under the MIT License.
