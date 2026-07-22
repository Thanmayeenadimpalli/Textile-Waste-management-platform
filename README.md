# 👕 Textile Waste Management AI System

An AI-powered Textile Waste Management System that leverages Deep Learning and Machine Learning to classify textile waste and support sustainable waste management practices.

---

## 📌 Project Overview

The objective of this project is to develop an intelligent system capable of identifying different textile materials from images. The system aims to automate textile waste classification, enabling efficient recycling, reuse, and proper waste management.

---

## 🚀 Project Progress

### ✅ Milestone 1 - Project Setup
- Created project structure
- Configured Flask backend
- Initialized React frontend
- GitHub repository setup
- Environment configuration

---

### ✅ Milestone 2 - Data Preprocessing & Model Development (In Progress)

#### Dataset Preparation
- Downloaded and organized the Fashion Dataset
- Loaded dataset using Pandas
- Examined dataset structure
- Selected required columns (`id`, `articleType`)
- Created image paths for all records
- Verified image availability
- Removed missing image entries

#### Data Preprocessing
- Cleaned dataset
- Encoded categorical labels using Label Encoding
- Split dataset into:
  - Training Set
  - Validation Set
  - Testing Set

#### Image Augmentation
Implemented image preprocessing using TensorFlow's `ImageDataGenerator`:
- Rescaling
- Rotation
- Zoom
- Horizontal Flip
- Width Shift
- Height Shift
- Shear Transformation

#### Deep Learning Model
- Implemented Transfer Learning
- Used **MobileNetV2** pretrained model
- Added custom classification layers
- Compiled the model using Adam Optimizer
- Model training in progress

---

## 🛠️ Technologies Used

### Frontend
- React.js

### Backend
- Flask
- Python

### Machine Learning
- TensorFlow
- Keras
- Scikit-learn
- Pandas
- NumPy

### Visualization
- Matplotlib

---

## 📂 Project Structure

```
Textile-Waste-management-platform
│
├── backend/
├── frontend/
├── dataset/
│   └── fashion-dataset/
├── notebooks/
├── model/
├── docs/
├── README.md
└── .gitignore
```

---

## 📊 Current Status

- ✔ Dataset preprocessing completed
- ✔ Image augmentation completed
- ✔ Data generators created
- ✔ MobileNetV2 architecture implemented
- ✔ Model compilation completed
- 🔄 Model training in progress
- ⏳ Model evaluation pending
- ⏳ Backend integration pending

---

## 🎯 Future Work

- Complete model training
- Evaluate model performance
- Save trained model
- Integrate model with Flask backend
- Build prediction API
- Connect frontend with backend
- Deploy the application

---

## 👩‍💻 Developed By

**Thanmayee**

B.Tech - Artificial Intelligence & Machine Learning

Shri Vishnu Engineering College for Women

---
