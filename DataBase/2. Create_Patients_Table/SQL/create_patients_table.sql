IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE ID = OBJECT_ID(N'Hospital'))
USE Hospital;

GO

IF OBJECT_ID('Patients', 'u') IS NULL
CREATE TABLE Patients
(
	PatientId INT IDENTITY(1, 1) PRIMARY KEY,
	FirstName NVARCHAR(50),
	Lastname NVARCHAR(50),
	MiddleName NVARCHAR(50),
	Sex NVARCHAR(10),
	Birthday DATE,
	AddressOfficial NVARCHAR(200),
	AddressCurrent NVARCHAR(200),
	State NVARCHAR(10),
	PhoneBase CHAR(20),
	PhoneAdd CHAR(20),
	Work NVARCHAR(200),
	InsurancePolicy CHAR(15),
	RetirementInsurance CHAR(15)
)