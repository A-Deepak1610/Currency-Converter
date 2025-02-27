# Currency Converter Application

## Overview
The Currency Converter Application is a full-stack web application that allows users to convert currencies in real-time. It also provides graphical insights into exchange rate trends over the past 10 days. The app includes separate user and admin pages, ensuring a structured interface for managing conversion data.

## Key Features
- **Real-Time Currency Conversion**: Fetches live exchange rates for accurate conversions.
- **Graphical Data Visualization**: Displays historical exchange rate trends using interactive graphs.
- **User and Admin Pages**:
  - **User Page**: Perform currency conversions and view results.
  - **Admin Page**: Manage and review conversion history.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Backend Data Storage**: Stores conversion records in a database for future reference.

## Technologies Used
### Frontend:
- React.js
-  CSS
- Recharts (for data visualization)

### Backend:
- Node.js with Express.js

### API Integration:
- ExchangeRatesAPI (for fetching real-time exchange rates)


## Usage
- **Users**:
  - Select currencies and enter the amount to convert.
  - View real-time conversion results and past exchange rate trends.
- **Admins**:
  - Manage and review stored conversion data.

## API Integration
- The application fetches exchange rates from [ExchangeRatesAPI](https://exchangeratesapi.io/).
- Ensure you have a valid API key and set it as `EXCHANGE_API_KEY` in the `.env` file.

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes and push:
   ```bash
   git commit -m "Description of changes"
   git push origin feature-name
   ```
4. Open a Pull Request.
## Acknowledgements
- [ExchangeRatesAPI](https://exchangeratesapi.io/) for providing real-time exchange rates.
- [Recharts](https://recharts.org/) for data visualization.
---
**Enjoy using the Currency Converter Application!**
