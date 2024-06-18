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
                    return Ok(true);
                }
                else
                {
                    await _bookQrMappingService.ArchiveBookQrMapping(inputDTO);
                    return Ok(true);
                }

            }
         
            catch (Exception e)
            {
                _logger.LogError(e, "Error processing BookQrMapping operation.");
                return BadRequest(e.Message);
            }
        }

        [HttpPost("revoke")]
        public async Task<ActionResult> RevokeBook(RevokeBookInputDTO inputDTO)
        {

            // input - bookIssueid, updatedBy, description
            // Algo -
            // 1. find bookIssueid from book issue table
            // 2. bookQrMappingid found status set to available
            // 3. fill recive date as the DateTime.UtcNow, updated by 
            // 4. also post a comment with bookissueId and actionId as recieved
            try
            {

                    await _bookQrMappingService.RevokeBook(inputDTO);
                    return Ok(true);

            }

            catch (Exception e)
            {
                _logger.LogError(e, "Error processing BookQrMapping operation.");
                return BadRequest(e.Message);
            }
        }


        [HttpPost("qrList")]
        public async Task<ActionResult> qrList()
        {
            try
            {

                List<string> returnList = await _bookQrMappingService.qrListService();
                return Ok(returnList);

            }

            catch (Exception e)
            {
                _logger.LogError(e, "Error processing BookQrMapping operation.");
                return BadRequest(e.Message);
            }
        }
    }
}
