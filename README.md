# 🧵 AI Textile Waste Management System

An AI-powered web application for textile waste classification, inventory management, sustainability analysis, recycling recommendations, and report generation.

---

## 📌 Project Overview

The **AI Textile Waste Management System** is an intelligent web application designed to support efficient textile waste management using Artificial Intelligence and Computer Vision.

The system allows users to:

- Upload textile waste images
- Classify textile defects using an AI model
- View prediction confidence
- Store prediction history
- Manage textile waste inventory
- Analyze sustainability impact
- Calculate circularity and recovery scores
- Generate recycling and reuse recommendations
- Generate PDF and Excel reports
- View analytics through an interactive dashboard

---

## 🎯 Objectives

- Automate textile waste classification.
- Reduce manual inspection and sorting effort.
- Maintain digital textile waste inventory.
- Provide AI-based prediction results.
- Support recycling and reuse decisions.
- Analyze environmental impact.
- Provide centralized analytics and reports.
- Promote sustainable textile waste management.

---

## ✨ Major Features

### 🤖 AI Prediction

- Textile image upload
- AI-based classification
- Defect/category prediction
- Confidence score
- Prediction history storage

### 📦 Inventory Management

- Add textile waste batches
- Edit inventory records
- Delete inventory records
- Search inventory
- Inventory analytics
- Fabric and source distribution

### 📊 Dashboard

- Total predictions
- Average confidence
- Most common textile category
- Fabric distribution
- Prediction distribution
- Prediction trends

### ♻️ Sustainability Intelligence

- CO₂ savings estimation
- Water savings estimation
- Landfill reduction
- Resource recovery
- Sustainability score
- Circularity score
- Recovery category

### 💡 Recycling Recommendations

The system provides recommendations based on textile analysis, including:

- Repair
- Reuse
- Donation
- Recycling
- Material recovery

### 📄 Reports

- AI Prediction Report
- Sustainability Report
- Inventory Report
- PDF report generation
- Excel export

### 🔔 Notifications

The backend supports notification creation, unread notification counts, and read/read-all operations.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │  React + Tailwind    │
                    └──────────┬───────────┘
                               │
                          Axios / REST API
                               │
                    ┌──────────▼───────────┐
                    │    Flask Backend     │
                    │      REST APIs       │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       AI Model          PostgreSQL DB      Services
       TensorFlow        Users              Reports
       Classification    Inventory          Notifications
                          Predictions
