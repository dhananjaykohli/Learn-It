using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learnit_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModuleController : ControllerBase
    {
        private readonly LearnitDbContext _context;

        public ModuleController(LearnitDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Module>>> GetModules()
        {
            var modules = await _context.Modules.ToListAsync();

            if (modules == null || modules.Count == 0)
            {
                return NotFound();
            }

            return Ok(modules);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Module>> GetModuleById(int id)
        {
            var module = await _context.Modules.FindAsync(id);

            if (module == null)
            {
                return NotFound();
            }

            return Ok(module);
        }

        [HttpPost]
        public async Task<ActionResult<Module>> CreateModule(Module module)
        {
            _context.Modules.Add(module);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetModuleById), new { id = module.ModuleId }, module);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModule(int id, Module module)
        {
            if (id != module.ModuleId)
            {
                return BadRequest();
            }

            _context.Entry(module).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModuleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Module>> DeleteModule(int id)
        {
            var module = await _context.Modules.FindAsync(id);
            if (module == null)
            {
                return NotFound();
            }

            _context.Modules.Remove(module);
            await _context.SaveChangesAsync();

            return Ok(module);
        }

        private bool ModuleExists(int id)
        {
            return _context.Modules.Any(e => e.ModuleId == id);
        }
    }
}
