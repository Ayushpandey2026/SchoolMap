-- ============================================================
-- School Management System - Database Schema
-- ============================================================

-- Create and use database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- ─── Schools Table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS schools (
  id        INT           NOT NULL AUTO_INCREMENT,
  name      VARCHAR(255)  NOT NULL,
  address   VARCHAR(500)  NOT NULL,
  latitude  FLOAT         NOT NULL,
  longitude FLOAT         NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ─── Sample Data ────────────────────────────────────────────
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('Central Academy', 'Civil Lines, Prayagraj, UP', 25.4358, 81.8463),
  ('Delhi Public School', 'Sector 21, Rohini, Delhi', 28.7184, 77.1030),
  ('St. Xavier High School', 'Park Street, Kolkata, WB', 22.5496, 88.3559),
  ('Vidya Mandir School', 'Anna Nagar, Chennai, TN', 13.0900, 80.2101),
  ('Modern English School', 'Koregaon Park, Pune, MH', 18.5370, 73.8934),
  ('Sunrise Public School', 'Banjara Hills, Hyderabad, TS', 17.4156, 78.4483),
  ('Holy Cross School', 'MG Road, Bangalore, KA', 12.9719, 77.6041),
  ('The Heritage School', 'Jodhpur, Rajasthan', 26.2389, 73.0243);
