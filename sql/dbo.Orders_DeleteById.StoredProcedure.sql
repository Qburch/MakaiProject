USE [Makai]
GO
/****** Object:  StoredProcedure [dbo].[Orders_DeleteById]    Script Date: 8/28/2023 10:46:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Kimberly Elliott
-- Create date: 2/24/2023
-- Description:	Orders Delete by Id
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


		CREATE PROC [dbo].[Orders_DeleteById]

		@Id int


	/*

	DECLARE @Id int = 2

	Select *
	FROM [dbo].[Orders]
	WHERE Id = @Id

	EXECUTE [dbo].[Orders_DeleteById]
	
	Select *
	FROM [dbo].[Orders]
	WHERE Id = @Id

	*/

	AS

	BEGIN


		DELETE FROM [dbo].[Orders]
		WHERE Id = @Id

	End
GO
