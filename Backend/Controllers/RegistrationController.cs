using ManavSevaTrust.Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace ManavSevaTrust.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    private static readonly List<Registration> Registrations = new();

    [HttpPost]
    public IActionResult Post(Registration request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        request.Id = Registrations.Count + 1;
        Registrations.Add(request);
        return CreatedAtAction(nameof(Get), new { id = request.Id }, request);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var registration = Registrations.FirstOrDefault(r => r.Id == id);
        return registration is null ? NotFound() : Ok(registration);
    }

    [HttpGet]
    public IActionResult List() => Ok(Registrations);
}
