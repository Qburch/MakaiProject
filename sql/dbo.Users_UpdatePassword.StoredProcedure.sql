USE [Makai]
GO
/****** Object:  StoredProcedure [dbo].[Users_UpdatePassword]    Script Date: 8/28/2023 10:46:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Bounheuangviseth, Vanhxay
-- Create date: 2/24/2023
-- Description:	Verifies token from dbo.UserTokens and if exists then update password in dbo.Users
-- =============================================



CREATE proc [dbo].[Users_UpdatePassword]
								 @Email nvarchar(255)
								,@Token nvarchar(200)
								,@Password nvarchar(100)


/*

	Declare @Email nvarchar(255) = 'rowej35452@kaudat.com'
			,@Token nvarchar(200) = '2a6d0935-f1eb-41dd-8798-722cc7c2384a'
			,@Password nvarchar(100) = 'Jello123!'
	
	Execute dbo.Users_UpdatePassword
								 @Email
								,@Token
								,@Password
*/

as

BEGIN

	IF EXISTS ( SELECT Token
				FROM	dbo.UserTokens
				WHERE	Token = @Token )

	BEGIN
	
				UPDATE	dbo.Users
				   SET	Password = @Password
				WHERE	Email = @Email
	
	END
	ELSE
	THROW	51000, 'Password reset failed, please try again.', 1;

	DELETE
	FROM	dbo.UserTokens
	WHERE	Token = @Token

END
GO
