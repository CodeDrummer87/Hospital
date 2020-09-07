IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE ID = OBJECT_ID(N'Hospital'))
USE Hospital;

GO

IF OBJECT_ID('Doctors', 'u') IS NOT NULL
DROP TABLE Doctors;