IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE ID = OBJECT_ID(N'Hospital'))
USE Hospital;

GO

IF OBJECT_ID('DoctorsPatients', 'u') IS NULL
CREATE TABLE DoctorsPatients
(
	VisitId INT IDENTITY(1, 1) PRIMARY KEY,
	VisitDateTime Datetime,
	PatientId INT REFERENCES Patients (PatientId) ON DELETE NO ACTION,
	DoctorId INT,
	Diagnosis NVARCHAR(MAX),
	Prescription NVARCHAR(MAX),

	FOREIGN KEY (DoctorId) REFERENCES Patients (PatientId) ON DELETE NO ACTION
);