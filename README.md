# Equine Oracle System - Standalone Version

🏇 A standalone, Manus-free version of the Equine Oracle System for deployment on Vercel.

## 🎯 Overview

This is a **clean, standalone Next.js application** that connects directly to the Railway ML API for horse racing predictions. No Manus dependencies, no complex authentication - just pure prediction power.

## 🏗️ Architecture

- **Frontend**: Next.js 14 with App Router + TypeScript + Tailwind CSS
- **Backend API**: Railway-hosted Express API
- **ML Engine**: Python LightGBM model (ROC-AUC: 0.5876)

## ✨ Features

- 🎯 Real-time horse race win probability predictions
- 🤖 Powered by trained LightGBM ensemble model
- 📊 Confidence scoring for each prediction
- 🎨 Beautiful gradient UI with Tailwind CSS
- ⚡ Fast, serverless deployment on Vercel
- 🔓 No authentication required (public demo)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/low-k3YLTD/equine-oracle-standalone)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://equine-oracle-system-production.up.railway.app
```

For Vercel deployment, add this in your project settings:
- **Variable**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://equine-oracle-system-production.up.railway.app`

## 📡 Backend API

The backend ML API is already deployed on Railway:

**URL**: `https://equine-oracle-system-production.up.railway.app`

**Endpoints**:
- `GET /api/model_info` - Get model information
- `POST /api/predict` - Get race prediction

**Repository**: [low-k3YLTD/equine-oracle-api](https://github.com/low-k3YLTD/equine-oracle-api)

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## 📊 ML Model Details

- **Algorithm**: LightGBM Ensemble
- **Features**: 13 engineered features
- **Performance**: 0.5876 ROC-AUC
- **Training Data**: Historical racing data (1990-2020)

## 🔄 Key Differences from Manus Version

| Feature | Manus Version | Standalone Version |
|---------|--------------|--------------------|
| Authentication | Manus OAuth | None (public) |
| Runtime | Manus Platform | Standard Next.js |
| Backend | Bundled tRPC | Separate Railway API |
| Database | Required | Not required |
| Deployment | Manus only | Any platform |

## 📝 Usage Example

```typescript
import axios from 'axios';

const response = await axios.post(
  'https://equine-oracle-system-production.up.railway.app/api/predict',
  {
    raceId: 'race_123',
    horseId: 'horse_456',
    features: {
      distance: 1600,
      days_since_last_race: 14,
      WIN_STREAK: 2,
      IMPLIED_PROBABILITY: 0.6,
      // ... more features
    }
  }
);

console.log(response.data);
// { prediction: 0.65, confidence: 0.78 }
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🔗 Related Repositories

- [Equine Oracle API](https://github.com/low-k3YLTD/equine-oracle-api) - Railway ML backend
- [Equine Oracle System](https://github.com/low-k3YLTD/Equine-Oracle-System) - Full Manus version
- [Equine Oracle Deployment](https://github.com/low-k3YLTD/equine-oracle-deployment) - Manus deployment repo

---

**Built with ❤️ for the horse racing community**
