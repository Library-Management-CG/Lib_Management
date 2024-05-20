using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using LIBRARY_MANAGEMENT.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookQrMappingController : ControllerBase
    {
        private readonly IBookQrMappingService _bookQrMappingService;

        private readonly ILogger<BookQrMappingService> _logger;


        public BookQrMappingController(IBookQrMappingService bookQrMappingService, ILogger<BookQrMappingService> logger)
        {
            _bookQrMappingService = bookQrMappingService;
            _logger = logger;

        }


        [HttpPost("archive")]
        public async Task<ActionResult> ArchiveBookQrMapping(ArchiveBookQrMappingInputDTO inputDTO)
        {
            try
            {

                if (inputDTO.IsArchive)
                {
                    await _bookQrMappingService.ArchiveBookQrMapping(inputDTO);
                    return Ok("BookQrMapping archived successfully.");
                }
                else
                {
                    await _bookQrMappingService.ArchiveBookQrMapping(inputDTO);
                    return Ok("BookQrMapping retrieved successfully.");
                }

            }
         
            catch (Exception e)
            {
                _logger.LogError(e, "Error processing BookQrMapping operation.");
                return BadRequest(e.Message);
            }
        }
    }
}
