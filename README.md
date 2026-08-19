# 🧵 AI Textile Waste Management System

An AI-powered web application for intelligent textile waste classification, inventory management, sustainability analysis, circularity assessment, recycling recommendations, prediction history, and report generation.

---

## 📌 Project Overview

The AI Textile Waste Management System is a web-based application designed to support efficient and sustainable textile waste management using Artificial Intelligence and Computer Vision.

The system allows users to upload textile images, classify textile defects using an AI model, manage textile waste inventory, analyze environmental impact, calculate sustainability and circularity scores, receive recycling and reuse recommendations, maintain prediction history, and generate reports.

The project integrates Artificial Intelligence, Computer Vision, React, Flask, PostgreSQL, and data analytics into a single platform.

---

## 🎯 Objectives

The main objectives of the project are:

- Automate textile defect classification using Artificial Intelligence.
- Reduce manual textile inspection and sorting effort.
- Digitally manage textile waste inventory.
- Store and track textile waste batches.
- Provide AI prediction results with confidence scores.
- Maintain prediction history.
- Analyze textile waste data through dashboards.
- Estimate environmental impact.
- Calculate sustainability and circularity scores.
- Provide recycling and reuse recommendations.
- Generate PDF and Excel reports.
- Support better textile waste management decisions.

---

## ✨ Major Features

### 🤖 1. AI Textile Prediction

The system uses a trained TensorFlow/Keras model to classify uploaded textile images.

Features:

- Upload textile images
- AI-based textile classification
- Textile defect prediction
- Confidence score
- Prediction result display
- Prediction history storage

Current AI classes:

1. Broken stitch
2. Defect free
3. Hole
4. Horizontal
5. Lines
6. Needle mark
7. Pinched fabric
8. Stain
9. Vertical

---

### 📦 2. Inventory Management

The inventory module allows users to digitally manage textile waste batches.

Features:

- Add textile waste
- Edit inventory records
- Delete inventory records
- Search inventory
- View batch information
- Track fabric type
- Track waste source
- Track quantity
- Track color
- Track condition
- Track collection date

Inventory analytics include:

- Total Inventory Records
- Fabric Type Distribution
- Waste Source Distribution
- Quantity by Fabric Type

---

### 📊 3. Dashboard Analytics

The dashboard provides an overview of textile waste and AI prediction data.

Dashboard statistics include:

- Total Predictions
- Average Confidence
- Most Common Textile
- Fabric Distribution
- Prediction Distribution
- Prediction Trends
- Sustainability Intelligence
- Circularity Information
- Environmental Impact

---

### 🧠 4. Prediction History

AI predictions are stored and displayed in the prediction history section.

Features:

- View previous predictions
- Search predictions
- Filter predictions
- View prediction details
- Display predicted class
- Display confidence score
- Display prediction date
- Download prediction data as Excel

---

### ♻️ 5. Sustainability Intelligence

The system provides sustainability analysis based on textile information.

Environmental impact metrics include:

- CO₂ Savings
- Water Savings
- Landfill Reduction
- Resource Recovery

Sustainability metrics include:

- Sustainability Score
- Circularity Score
- Recovery Category

The sustainability module helps users understand the environmental benefits of textile reuse and recovery.

---

### 🔄 6. Circularity Analysis

The system calculates a circularity score to represent the recovery potential of textile waste.

The application displays:

- Sustainability Score
- Circularity Score
- Recovery Category
- Environmental impact information

---

### 💡 7. Recycling & Reuse Recommendations

The system provides recommendations based on textile analysis.

Recommendations can include:

- Repairing damaged textiles
- Reusing wearable textiles
- Donating reusable textiles
- Extending textile useful life
- Recycling through appropriate recycling channels
- Recovering textile materials

---

### 📄 8. Reports

The application provides different types of reports.

Available reports:

- AI Prediction Report
- Sustainability Report
- Inventory Report

AI Prediction Report provides:

- Total Predictions
- Average Confidence
- Classes Detected
- Prediction History

Inventory Report provides:

- Total Batches
- Total Quantity
- Reusable Batches
- Damaged Batches
- Inventory Details

Sustainability Report provides:

- CO₂ Savings
- Water Savings
- Landfill Reduction
- Resource Recovery
- Sustainability Score
- Circularity Score
- Recovery Category

The application also supports:

- PDF report generation
- Excel export
- Email report functionality

---

### 🔔 9. Notifications

The backend contains a notification system for application events.

Notification functionality includes:

- View notifications
- Check unread notifications
- Mark individual notifications as read
- Mark all notifications as read
- Create notifications for important application events

Examples include:

- Inventory batch successfully added
- Report successfully emailed

---

## 🏗️ System Architecture

                         ┌──────────────────────────┐
                         │      React Frontend      │
                         │                          │
                         │ React                    │
                         │ Tailwind CSS             │
                         │ React Router             │
                         │ Axios                    │
                         └────────────┬─────────────┘
                                      │
                                      │ REST APIs
                                      ▼
                         ┌──────────────────────────┐
                         │      Flask Backend       │
                         │                          │
                         │ Authentication           │
                         │ Inventory APIs           │
                         │ Prediction APIs          │
                         │ Dashboard APIs           │
                         │ History APIs             │
                         │ Sustainability APIs      │
                         │ Circularity APIs         │
                         │ Recommendation APIs      │
                         │ Report APIs              │
                         │ Notification APIs        │
                         └────────────┬─────────────┘
                                      │
                         ┌────────────┴─────────────┐
                         │                          │
                         ▼                          ▼
                ┌──────────────────┐       ┌──────────────────┐
                │    AI Model      │       │    PostgreSQL    │
                │                  │       │    Database      │
                │ TensorFlow       │       │                  │
                │ Keras            │       │ Users            │
                │ Classification   │       │ Inventory        │
                │                  │       │ Predictions      │
                └──────────────────┘       │ Notifications    │
                                           └──────────────────┘

---

## 🔄 End-to-End Project Workflow

                         USER
                           │
                           ▼
                    Login / Register
                           │
                           ▼
                       Dashboard
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
      Inventory Management          AI Prediction
             │                           │
             ▼                           ▼
       Add Textile Waste            Upload Image
                                         │
                                         ▼
                                Image Preprocessing
                                         │
                                         ▼
                                  AI Model
                                         │
                                         ▼
                                   Prediction
                                         │
                                         ▼
                                Confidence Score
                                         │
                                         ▼
                                Prediction History
                                         │
                                         ▼
                            Sustainability Analysis
                                         │
                         ┌───────────────┴──────────────┐
                         │                              │
                         ▼                              ▼
                   Circularity                   Recommendations
                         │                              │
                         └───────────────┬──────────────┘
                                         ▼
                                      Reports
                              ┌──────────┴──────────┐
                              ▼                     ▼
                            PDF                   Excel

---

## 🛠️ Technology Stack

### Frontend

- React.js
- JavaScript
- Tailwind CSS
- Axios
- React Router
- Vite

### Backend

- Python
- Flask
- Flask SQLAlchemy
- Flask CORS
- REST APIs

### Artificial Intelligence

- TensorFlow
- Keras
- NumPy
- Pillow
- Trained textile classification model

### Database

- PostgreSQL

### Development Tools

- Visual Studio Code
- Git
- GitHub
- PowerShell

---

## 📂 Project Structure

Textile-Waste-management-platform/
│
├── backend/
│   ├── ai/
│   │   ├── label_encoder.pkl
│   │   ├── recommendations.py
│   │   ├── sustainability.py
│   │   └── textile_model.keras
│   │
│   ├── controllers/
│   ├── database/
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── inventory.py
│   │   ├── notification.py
│   │   ├── prediction.py
│   │   └── user.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── circularity.py
│   │   ├── dashboard.py
│   │   ├── history.py
│   │   ├── inventory.py
│   │   ├── notifications.py
│   │   ├── predict.py
│   │   ├── recommendations.py
│   │   ├── reports.py
│   │   └── sustainability.py
│   │
│   ├── services/
│   │   ├── email_service.py
│   │   └── notification_service.py
│   │
│   ├── tests/
│   │   └── test_api.py
│   │
│   ├── uploads/
│   ├── utils/
│   ├── app.py
│   ├── config.py
│   └── requirements.txt
│
├── dataset/
│   ├── Broken stitch/
│   ├── defect free/
│   ├── hole/
│   ├── horizontal/
│   ├── lines/
│   ├── Needle mark/
│   ├── Pinched fabric/
│   ├── stain/
│   └── Vertical/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       ├── utils/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── model/
│   └── fabric_defect_model.keras
│
├── notebooks/
├── test_images/
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── package-lock.json

---

## 🧠 AI Model

The AI component uses a trained TensorFlow/Keras model for textile image classification.

The prediction workflow is:

Textile Image
      ↓
Image Preprocessing
      ↓
TensorFlow / Keras Model
      ↓
Prediction Probabilities
      ↓
Highest Probability Class
      ↓
Label Encoder
      ↓
Predicted Textile Class
      ↓
Confidence Score

The backend AI files include:

- backend/ai/textile_model.keras
- backend/ai/label_encoder.pkl

The project also contains:

- model/fabric_defect_model.keras

---

## 📊 Dataset

The project uses a textile defect image dataset organized into nine classes.

dataset/
│
├── Broken stitch/
├── defect free/
├── hole/
├── horizontal/
├── lines/
├── Needle mark/
├── Pinched fabric/
├── stain/
└── Vertical/

The dataset is used for training and testing the textile image classification model.

---

## 📈 Application Results

The working application demonstrates:

### AI Prediction

- Textile image classification
- Prediction confidence
- Prediction history storage

### Dashboard

- Prediction statistics
- Fabric distribution
- Prediction distribution
- Prediction trends

### Inventory

- Inventory records
- Fabric type distribution
- Waste source distribution
- Quantity analysis

### Sustainability

The application generates environmental and sustainability metrics for analyzed textile inputs.

Example output:

CO₂ Savings          : 180 kg
Water Savings        : 4200 L
Landfill Reduction   : 50 kg
Resource Recovery    : 94%

Sustainability Score : 91 / 100
Circularity Score    : 84.55 / 100

Recovery Category    : High Recovery Potential

---

## 🧪 API Testing

The project contains an API testing script:

backend/tests/test_api.py

The current API test execution produced:

============================================================
TEXTILE WASTE MANAGEMENT API TESTING
============================================================

PASS: Home API
PASS: Dashboard API
PASS: Inventory GET API
PASS: Inventory Analytics API
PASS: History API
PASS: Notifications API
PASS: Sustainability API
PASS: Circularity API
PASS: Recommendations API

============================================================
RESULT: 9 PASSED / 0 FAILED
============================================================

This verifies the major backend API modules.

---

## 🔌 REST API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a user |
| POST | `/login` | Login user |

### AI Prediction

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predict` | Predict textile image |

### Inventory

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/inventory` | Get inventory records |
| POST | `/inventory` | Add textile waste |
| PUT | `/inventory/<id>` | Update inventory |
| DELETE | `/inventory/<id>` | Delete inventory |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard-stats` | Get dashboard statistics |

### Prediction History

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/history` | Get prediction history |

### Sustainability

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/sustainability-report` | Generate sustainability analysis |

### Circularity

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/circularity` | Calculate circularity information |

### Recommendations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/recommendations` | Generate recommendations |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications` | Get notifications |
| GET | `/notifications/unread-count` | Get unread notification count |
| PUT | `/notifications/<id>/read` | Mark notification as read |
| PUT | `/notifications/read-all` | Mark all notifications as read |

### Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reports/email` | Email generated report |

---

## 🚀 Installation & Setup

### 1. Clone the Repository

    git clone https://github.com/Thanmayeenadimpalli/Textile-Waste-management-platform.git

    cd Textile-Waste-management-platform

---

## 🐍 Backend Setup

Open a terminal:

    cd backend

Create a virtual environment:

    python -m venv venv

Activate the virtual environment on Windows:

    venv\Scripts\activate

Install dependencies:

    pip install -r requirements.txt

Start the Flask backend:

    python app.py

Backend URL:

    http://127.0.0.1:5000

---

## ⚛️ Frontend Setup

Open another terminal:

    cd frontend

Install dependencies:

    npm install

Start the Vite development server:

    npm run dev

Open the local URL displayed by Vite.

---

## 🖥️ Complete Application Workflow

After starting both backend and frontend:

Login
  ↓
Dashboard
  ↓
Inventory
  ↓
Add Textile Waste
  ↓
AI Prediction
  ↓
Prediction Result
  ↓
Sustainability Analysis
  ↓
Circularity Analysis
  ↓
Recycling Recommendations
  ↓
Prediction History
  ↓
Reports
  ↓
PDF / Excel / Email

---

## 📸 Application Modules

### 🔐 Login & Registration

Provides user authentication and application entry.

### 📊 Dashboard

Displays:

- Total predictions
- Average confidence
- Most common textile
- Fabric distribution
- Prediction distribution
- Prediction trends
- Sustainability intelligence

### 📦 Inventory Management

Provides:

- Inventory analytics
- Waste source distribution
- Quantity analysis
- Inventory records
- Add Waste
- Edit
- Delete
- Search

### 🤖 AI Prediction

Allows users to upload textile images and view:

- Predicted class
- Confidence score
- Prediction result
- Sustainability information
- Circularity information
- Recycling recommendations
- Report options

### 🧠 Prediction History

Displays:

- Image name
- Prediction
- Confidence
- Date
- View action
- Excel export

### 📄 Reports

Provides:

- AI Prediction Report
- Sustainability Report
- Inventory Report
- PDF generation
- Excel export
- Email report

---

## ⚠️ Challenges Faced

### Dataset Management

Finding and organizing suitable textile defect images into classification categories.

### AI Model Integration

Integrating the trained TensorFlow/Keras model with the Flask backend.

### Frontend–Backend Integration

Connecting React frontend components with Flask REST APIs using Axios.

### Database Integration

Managing users, inventory records, predictions, and notifications using PostgreSQL.

### Image Upload and Prediction

Handling image uploads and passing uploaded images through the AI prediction pipeline.

### Report Generation

Generating reports and integrating email report functionality.

### API Testing

Testing multiple backend APIs to verify that the integrated modules work correctly.

---

## 🔮 Future Enhancements

The current project provides a working local application.

Future enhancements can include:

- Larger real-world industrial textile datasets
- Improved AI model accuracy
- Real-time camera-based textile detection
- Automated industrial textile segregation
- IoT-enabled textile waste monitoring
- QR-based textile batch tracking
- Advanced carbon footprint estimation
- Mobile application
- Multi-language support
- Cloud deployment
- Robotic textile sorting systems
- Advanced predictive waste management

---

## 🌱 Environmental Impact

The system is designed to support sustainable textile waste management by:

- Encouraging textile reuse
- Supporting textile recycling
- Reducing unnecessary landfill disposal
- Promoting material recovery
- Improving textile waste tracking
- Supporting circular economy practices
- Providing environmental impact information

---

## 🎯 Project Outcomes

The completed system demonstrates:

- AI-powered textile classification
- Digital textile inventory management
- Prediction history management
- Dashboard analytics
- Sustainability analysis
- Circularity assessment
- Recycling and reuse recommendations
- AI prediction reports
- Inventory reports
- Sustainability reports
- Excel export
- Email report functionality
- REST API integration
- PostgreSQL database integration
- Local end-to-end application workflow

---

## 📌 Current Project Status

The project is implemented as a local working application.

The major frontend, backend, AI prediction, inventory, dashboard, prediction history, sustainability, circularity, recommendation, notification, and reporting modules have been integrated.

The backend API test suite currently reports:

    9 PASSED / 0 FAILED

The project can be demonstrated locally as part of the final project presentation and live demonstration.

Docker and cloud deployment are not required for the current project demonstration.

---

## 📜 License

This project is licensed under the MIT License.

See the LICENSE file for details.

---

## 👩‍💻 Developer

Thanmayee

B.Tech – Computer Science & Engineering
Shri Vishnu Engineering College for Women

---

## 🔗 GitHub Repository

https://github.com/Thanmayeenadimpalli/Textile-Waste-management-platform

---

# 🧵 AI Textile Waste Management System

Artificial Intelligence • Computer Vision • Sustainability • Circular Economy
