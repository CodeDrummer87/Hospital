IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE ID = OBJECT_ID(N'Hospital'))
USE Hospital;

GO

IF OBJECT_ID('Patients', 'u') IS NOT NULL

EXEC sp_rename 'Patients.State', 'Locality', 'COLUMN';