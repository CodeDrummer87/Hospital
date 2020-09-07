IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE ID = OBJECT_ID(N'Hospital'))
USE Hospital;

GO

IF OBJECT_ID('Doctors', 'u') IS NULL
CREATE TABLE Doctors
(
	DoctorId INT IDENTITY(1, 1) PRIMARY KEY,
	TabNumber INT,
	FirstName NVARCHAR(50),
	Lastname NVARCHAR(50),
	MiddleName NVARCHAR(50),
	Specialty NVARCHAR(50),
	Office NVARCHAR(10),
	Birthday DATE,
	Phone CHAR(20)
);