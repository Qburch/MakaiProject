using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Makai.Services;
using Makai.Services.Interfaces;
using Makai.Web.Controllers;
using System;
using Makai.Web.Models.Responses;
using Makai.Models.Requests;


namespace Makai.Web.Api.Controllers
{
    [Route("api/emails")]
    [ApiController]
    public class EmailApiController : BaseApiController
    {
        private IEmailService _service = null;
        private IAuthenticationService<int> _authService = null;
        
        public EmailApiController( IEmailService service, ILogger<EmailApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost("contactus")]
        public ActionResult<SuccessResponse> ContactUs(ContactUsRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                _service.SendContactUsEmail(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
