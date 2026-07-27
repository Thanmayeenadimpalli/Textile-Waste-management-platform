# 🧵 AI Textile Waste Management System

<p align="center">
  <img src="media/dashboard.png" alt="Dashboard" width="100%">
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Flask](https://img.shields.io/badge/Flask-Python-black?logo=flask)
![TensorFlow](https://img.shields.io/badge/TensorFlow-DeepLearning-orange?logo=tensorflow)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

---

# 📖 Overview

The **AI Textile Waste Management System** is an intelligent web application designed to simplify the management of textile waste using Artificial Intelligence.

The system enables industries and recycling organizations to upload textile waste images, classify waste using AI, maintain inventory records, generate recycling recommendations, monitor waste analytics, and produce downloadable reports.

The application combines **Artificial Intelligence**, **Computer Vision**, **Web Development**, and **Database Management** into one integrated platform.

---

# 🎯 Objectives

- Automate textile waste identification.
- Reduce manual sorting effort.
- Improve recycling efficiency.
- Maintain digital inventory records.
- Provide intelligent recycling recommendations.
- Generate analytics and reports.
- Promote sustainable textile waste management.

---

# ✨ Features

## 🤖 AI Prediction

- Upload multiple textile images
- AI-based waste classification
- Confidence score calculation
- Batch prediction support

---

## 📦 Inventory Management

- Add textile waste
- Edit records
- Delete records
- Search inventory
- Inventory analytics

---

## 📊 Dashboard Analytics

- Total Predictions
- Average Confidence
- Most Common Textile Waste
- Fabric Distribution

---

## 📈 AI Analytics

- Prediction History
- Prediction Dashboard
- Search
- Filtering
- Statistics

---

## ♻ Recycling Module

- Recycling recommendations
- Environmental impact
- Waste reuse suggestions

---

## 📄 Reports

- Download PDF Report
- Export Excel Report

---

# 🏗 System Architecture

```
                +------------------------+
                |   React Frontend       |
                +-----------+------------+
                            |
                            |
                    REST API (Axios)
                            |
                            |
                +-----------+------------+
                |     Flask Backend      |
                +-----------+------------+
                            |
        +-------------------+------------------+
        |                                      |
        |                                      |
TensorFlow Model                    PostgreSQL Database
        |                                      |
        |                                      |
Image Classification          Inventory & Prediction Storage
```

---

# 🔄 Project Workflow

```
Textile Waste Image
        │
        ▼
Image Upload
        │
        ▼
Image Preprocessing
        │
        ▼
TensorFlow AI Model
        │
        ▼
Waste Classification
        │
        ▼
Database Storage
        │
        ▼
Dashboard Analytics
        │
        ▼
Recycling Recommendation
        │
        ▼
PDF / Excel Reports
```

---

# 🛠 Technology Stack

## Frontend

- React.js
- Tailwind CSS
- Axios
- React Router
- Chart.js

---

## Backend

- Flask
- Flask SQLAlchemy
- Flask CORS
- REST API

---

## Artificial Intelligence

- TensorFlow
- MobileNetV2
- NumPy
- Pillow

---

## Database

- PostgreSQL

---

## Tools

- VS Code
- Git
- GitHub
- Postman

---

# 📂 Project Structure

```
AI-Textile-Waste-Management-System

│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── assets
│   └── App.jsx
│
├── backend
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── ml_model
│   ├── app.py
│   └── config.py
│
├── media
│
├── README.md
│
└── requirements.txt
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Textile-Waste-Management-System.git
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🖥 Application Screenshots

## 📊 Dashboard

The dashboard provides a real-time overview of textile waste analytics including prediction count, average confidence, and fabric distribution.

```md
![Dashboard](media/dashboard.png)
```

---

## 📦 Inventory Analytics

The inventory module visualizes textile waste records using interactive charts.

```md
![Inventory Analytics](media/inventory1.png)
```

```md
![Inventory Source](media/inventory2.png)
```

```md
![Inventory Table](media/inventory3.png)
```

---

## 🤖 AI Textile Waste Prediction

Users can upload multiple textile waste images for AI-based classification.

```md
![Upload](media/upload.png)
```

---


# 🤖 AI Prediction Results

The AI model analyzes uploaded textile waste images and predicts the textile category with a confidence score.

### Features

- Multiple Image Prediction
- Confidence Score
- Batch Summary
- Prediction Storage
- Real-time Results

```md
![Prediction Results](media/prediction_results.png)
```

---

# 📊 Batch Summary

After prediction, the application generates an overall summary of the uploaded batch.

The summary includes:

- Total Images Processed
- Textile Waste Categories
- Number of Items per Category
- Overall AI Prediction Summary

---

# ♻ Recycling Recommendations

The system automatically generates recycling suggestions based on the predicted textile waste type.

Recommendations include:

- Reuse possibilities
- Recycling methods
- Environmental benefits
- Sustainable disposal suggestions

```md
![Recycling Recommendation](media/recommendation.png)
```

Example:

| Textile Waste | Recommendation |
|---------------|---------------|
| Cotton Textile Waste | Recycle into cleaning cloths or insulation materials |
| Denim Textile Waste | Recycle denim fibers or upcycle into bags |
| Polyester Waste | Process into recycled polyester fibers |
| Mixed Textile Waste | Separate materials before recycling |

---

# 📈 AI Prediction Dashboard

The Prediction Dashboard provides an overview of all AI predictions.

### Dashboard Statistics

- Total Predictions
- Average Confidence
- Highest Confidence
- Search Predictions
- Filter Predictions
- Detailed View

```md
![Prediction Dashboard](media/prediction_dashboard.png)
```

---

# 📜 Prediction History

Every prediction made by the AI model is stored in the PostgreSQL database.

Features include:

- Search Prediction
- Filter by Category
- View Details
- Download Excel Report

```md
![Prediction History](media/history.png)
```

---

# 📦 Inventory Management

The Inventory Module helps industries maintain textile waste records.

### Supported Operations

- Add Waste Record
- Edit Waste Record
- Delete Waste Record
- Search Inventory
- Inventory Statistics

### Inventory Analytics

- Fabric Type Distribution
- Waste Source Distribution
- Quantity Analysis

---

# 📊 Reports

The application supports exporting reports for documentation and analysis.

### Supported Reports

- PDF Prediction Report
- Excel Prediction History
- Inventory Analytics Report

---

# 🔌 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /register | Register User |
| POST | /login | Login User |

---

## AI Prediction

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /predict | Predict Textile Waste |

---

## Inventory

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /inventory | Get Inventory |
| POST | /inventory | Add Waste |
| PUT | /inventory/<id> | Update Waste |
| DELETE | /inventory/<id> | Delete Waste |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /dashboard-stats |

---

## Prediction History

| Method | Endpoint |
|---------|----------|
| GET | /history |

---

# 🎯 Project Outcomes

✔ AI-powered textile waste classification

✔ Intelligent recycling recommendations

✔ Digital inventory management

✔ Real-time analytics dashboard

✔ Prediction history management

✔ Report generation (PDF & Excel)

✔ Improved waste monitoring and tracking

---

# 🚀 Future Enhancements

The current project demonstrates a complete AI-based textile waste management workflow. Future improvements may include:

- Real industrial textile waste datasets
- YOLO-based object detection for mixed textile waste
- Live camera-based waste detection
- IoT-enabled smart waste bins
- QR code tracking for textile batches
- Carbon footprint estimation
- Cloud deployment (AWS/Azure/GCP)
- Mobile application (Android & iOS)
- Multi-language support
- AI-powered waste segregation using robotic systems

---

# 🌱 Environmental Impact

The AI Textile Waste Management System contributes to sustainability by:

- Reducing landfill textile waste
- Encouraging textile recycling
- Promoting reuse of reusable fabrics
- Supporting circular economy initiatives
- Improving resource utilization

---

# 💡 Challenges Faced

- Limited availability of publicly labeled textile waste datasets
- Integrating AI with the web application
- Handling multiple image uploads
- Managing prediction history efficiently
- Maintaining database consistency
- Optimizing AI inference performance

---

# 🏆 Conclusion

The **AI Textile Waste Management System** demonstrates how Artificial Intelligence can be integrated with modern web technologies to improve textile waste management.

By combining **React**, **Flask**, **TensorFlow**, and **PostgreSQL**, the system provides an end-to-end solution for waste classification, inventory management, analytics, recycling recommendations, and report generation.

The modular architecture allows the AI model to be replaced or retrained with real industrial textile waste datasets in the future, making the application scalable for real-world deployment.

---

# 👩‍💻 Developed By

**Thanmayee**

B.Tech – Computer Science & Engineering

Shri Vishnu Engineering College for Women

---

# 🙏 Acknowledgements

Special thanks to:

- Faculty Mentors
- Shri Vishnu Engineering College for Women
- TensorFlow Community
- React Community
- Flask Community
- PostgreSQL Community
- Open Source Contributors

---

# 📜 License

This project is developed for **academic and educational purposes**.

Feel free to use, modify, and extend the project for learning and research.

---

<p align="center">

⭐ **If you found this project useful, consider giving it a Star on GitHub!** ⭐

Made with ❤️ using **React • Flask • TensorFlow • PostgreSQL**

</p>
