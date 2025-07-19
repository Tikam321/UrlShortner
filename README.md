# Scalable URL Shortener 🚀

A high-performance URL shortening service built with **Node.js**, **Express**, and **MongoDB**, enhanced with **Redis** caching for ultra-fast redirects and **Apache Kafka** for asynchronous analytics.

## 🔧 Features
- Shorten and redirect URLs with low latency
- In-memory caching using **Redis** to drastically reduce DB load
- Event-driven architecture powered by **Kafka** producers (on redirect) and consumers (persisting analytics)
- Store click history in **MongoDB**
- Dockerized setup for easy development and deployment

## ⚙️ Tech Stack
Node.js • Express • MongoDB • **Redis** • **Apache Kafka** • Docker
