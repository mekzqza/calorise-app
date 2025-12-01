# 1) ใช้ Python เวอร์ชั่น 3.12 (เหมาะกับ FastAPI + TensorFlow CPU)
FROM python:3.12-slim

# 2) ตั้ง working directory
WORKDIR /app

# 3) Copy requirements ก่อน (เพื่อใช้ Docker cache)
COPY requirements.txt .

# 4) ติดตั้ง dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5) Copy โค้ดทั้งหมดเข้า container
COPY . .

# 6) เปิด port 8000 สำหรับ FastAPI
EXPOSE 8000

# 7) คำสั่งรัน server ของ FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
