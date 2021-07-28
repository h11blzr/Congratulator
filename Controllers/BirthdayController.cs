using Congratulator.Data;
using Congratulator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Congratulator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BirthdayController : ControllerBase
    {
        private readonly BirthdayDbContext _context;

        public BirthdayController(BirthdayDbContext context)
        {
            _context = context;
        }

        [HttpGet("twoweeks")]
        public async Task<ActionResult<IList<BirthdayRecord>>> GetBirthdayRecords()
        {
            var closestBd = await _context.BirthdayRecords.OrderBy(o => o.Date.DayOfYear)
                .Where(o => (o.Date.DayOfYear >= DateTime.Today.DayOfYear && o.Date.DayOfYear < DateTime.Today.AddDays(14).DayOfYear))
                .ToListAsync();

            return closestBd;
        }

        [HttpGet, HttpGet("all-records")]
        public async Task<ActionResult<IReadOnlyList<BirthdayRecord>>> GetAllBirthdayRecords()
        {
            return await _context.BirthdayRecords.OrderBy(o => o.Date.DayOfYear).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BirthdayRecord>> GetBirthdayRecordById(int id)
        {
            var record = await _context.BirthdayRecords.FindAsync(id);
            if (record == null)
            {
                return NotFound("The record was not found");
            }
            return record;
        }

        [HttpPost]
        public async Task<ActionResult<BirthdayRecord>> AddBirthdayRecord(BirthdayRecord birthdayRecord)
        {
            _context.BirthdayRecords.Add(birthdayRecord);
            await _context.SaveChangesAsync();
            return Ok(birthdayRecord);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBirthdayRecord(int id)
        {
            var record = await _context.BirthdayRecords.FindAsync(id);
            _context.BirthdayRecords.Remove(record);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> EditBirthdayRecord(BirthdayRecord birthdayRecord)
        {
            var oldRecord = await _context.BirthdayRecords.Where(r => r.Id == birthdayRecord.Id).FirstOrDefaultAsync();
            if (oldRecord != null)
            {
                oldRecord.Name = birthdayRecord.Name;
                oldRecord.Date = birthdayRecord.Date;
                await _context.SaveChangesAsync();
                return Ok();
            } else
            {
                return NotFound("The record was not found");
            }
        }
    }
}
