# 1) เลือก base image ของ Node.js (เลือก LTS เพราะเสถียรที่สุด)
FROM node:18

# 2) ตั้ง working directory ใน container
WORKDIR /app

# 3) copy ไฟล์ dependencies ก่อน เพื่อให้ Docker cache ทำงานดี
COPY package.json package-lock.json ./

# 4) ติดตั้ง dependencies
RUN npm install

# 5) copy โค้ดทั้งหมดของ backend เข้า container
COPY . .

# 6) เปิด port ที่ backend ใช้ (คุณใช้ port 5000)
EXPOSE 5000

# 7) คำสั่งที่ให้ container รันเมื่อเริ่มต้น
CMD ["node", "server.js"]
