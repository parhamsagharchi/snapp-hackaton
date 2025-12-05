# SnappShare 🚗📦

> Smart utilization of empty vehicle capacity for parcel delivery

**SnappShare** is an innovative hackathon project that leverages unused trunk space in Snapp (ride-sharing) vehicles to transport small and medium-sized parcels without disrupting passenger trips. This solution creates additional revenue streams for drivers, increases platform orders, and reduces urban traffic and pollution.

## 🌐 Live Demo

**🔗 [View Live Demo](https://snapp-hackaton.vercel.app/)**

> ⚠️ **Note**: This is a temporary deployment link and may be removed soon.

## 🌟 Overview

In today's economy where fuel prices are continuously rising and air pollution has become a serious issue in major cities, SnappShare addresses the gap between bike cargo (too small) and van cargo (too large) by utilizing the empty trunk space of existing passenger trips.

### The Problem

- Thousands of Snapp drivers travel long distances daily without carrying any cargo
- Market demand exists for cargo that's too large for bikes but too small for vans
- This creates an untapped market opportunity

### The Solution

SnappShare intelligently matches parcel delivery requests with existing passenger trips, allowing drivers to earn additional income without extra costs, while passengers experience no disruption to their journey.

## ✨ Features

- 🗺️ **Interactive Map Visualization** - Real-time map with Leaflet showing drivers, passengers, parcels, and optimized routes
- 🎯 **Smart Route Optimization** - TSP (Traveling Salesman Problem) algorithm with Nearest Neighbor and 2-opt improvements
- 👥 **Passenger Selection** - Choose passengers and view available parcel offers
- 📦 **Parcel Matching** - Intelligent matching of parcels based on origin/destination radius and route optimization
- 🎮 **Route Simulation** - Real-time simulation of optimized routes with visual feedback
- ⚙️ **Configurable Settings** - Adjustable parameters for route optimization and matching algorithms
- 📊 **Multi-criteria Scoring** - Parcels are scored based on 4 normalized criteria:
  - Total route distance (35%)
  - Detour distance (30%)
  - Distance to first stop (15%)
  - Alignment with passenger route (20%)

## 🛠️ Tech Stack

### Core

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite 7.2.4** - Build tool and dev server

### UI & Styling

- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Icon library
- **GSAP 3.13.0** - Animation library

### Maps & Location

- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 4.2.1** - React bindings for Leaflet

### State Management & Routing

- **Zustand 5.0.8** - Lightweight state management
- **React Router DOM 7.9.6** - Client-side routing

### Forms & Validation

- **React Hook Form 7.66.1** - Form management
- Custom validation utilities

### Other Libraries

- **React Hot Toast 2.6.0** - Toast notifications
- **KaTeX 0.16.25** - Math rendering for algorithm documentation
- **clsx 2.1.0** - Conditional class names

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm** (preferred) or npm/yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd snapp-hackaton
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   The app will automatically open at `http://localhost:3000`

## 🚀 Usage

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint
```

### Key Pages

- **Home (`/`)** - Main simulation page with passenger selection and parcel matching
- **Passengers (`/passengers`)** - Manage passenger locations
- **Parcels (`/parcels`)** - Manage parcel offers
- **Driver (`/driver`)** - Driver view and route visualization
- **Settings (`/settings`)** - Configure algorithm parameters
- **Pitch (`/pitch`)** - Project presentation and algorithm documentation

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── leaflet-map/    # Map components and utilities
│   ├── shared/         # Reusable UI components
│   └── spinner/        # Loading spinner
├── hooks/              # Custom React hooks
│   ├── useMapAutoFit.ts
│   ├── useParcelOffers.ts
│   ├── usePassengerSelection.ts
│   ├── useRouteOptimization.ts
│   └── useSimulation.ts
├── pages/              # Page components
│   ├── home/           # Main simulation page
│   ├── passengers/     # Passenger management
│   ├── parcels/        # Parcel management
│   ├── driver/         # Driver view
│   ├── settings/       # Settings page
│   └── pitch/          # Project pitch
├── store/              # Zustand state management
│   ├── map.store.ts    # Map and route state
│   └── settings.store.ts
├── utils/              # Utility functions
│   ├── tsp.ts          # TSP algorithm implementation
│   ├── coordinates.ts  # Coordinate calculations
│   └── validation.ts   # Form validation
├── router/             # React Router configuration
└── layout/             # Layout components
```

## 🧮 Algorithm Details

### TSP Route Optimization

The system uses a **Traveling Salesman Problem (TSP)** algorithm with the following approach:

1. **Nearest Neighbor Heuristic** - Fast initial route construction
2. **2-opt Improvement** - Route optimization by swapping edges
3. **Haversine Distance** - Accurate distance calculations considering Earth's curvature

### Matching Algorithm

Parcels are matched based on:

1. **Origin Radius Filter** - Distance between passenger origin and parcel origin ≤ R_origin + tolerance (default: 2km)
2. **Destination Radius Filter** - Distance between passenger destination and parcel destination ≤ R_destination + tolerance (default: 2km)
3. **Route Optimization** - All valid route combinations are generated and the shortest path is selected
4. **Scoring System** - Multi-criteria normalized scoring for optimal parcel selection

### Scoring Formula

```
Score = w₁ × D_total^norm + w₂ × D_detour^norm + w₃ × D_first^norm + w₄ × A_norm
```

Where:

- **w₁ = 0.35**: Total route distance
- **w₂ = 0.30**: Detour distance (extra distance vs. direct passenger route)
- **w₃ = 0.15**: Distance to first stop
- **w₄ = 0.20**: Alignment with passenger route

**Lower scores are better** - parcels are ranked by ascending score.

## 🎯 Key Benefits

- 💰 **Additional Revenue** - Drivers earn extra income without additional costs
- 📈 **Platform Growth** - New valuable orders for the platform
- 🌱 **Environmental Impact** - Reduced unnecessary trips and air pollution
- 🎯 **Market Fit** - Addresses the gap between bike and van cargo
- 🤝 **Win-Win-Win** - Benefits passengers, drivers, platform, and the city

## ⚠️ Current Limitations

- Multi-destination orders are not supported in the initial phase
- Trips with intermediate stops or existing cargo are excluded from matching
- These limitations ensure a faster, simpler initial version

## 🌐 Browser Support

Modern browsers with ES6+ support:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project was created for a hackathon. Please check the license file for details.

## 🤝 Contributing

This is a hackathon project. Contributions and feedback are welcome!

## 📧 Contact

For questions or inquiries about this project, please refer to the hackathon organizers or project team.

---

**Built with ❤️ for the Snapp Hackathon**
