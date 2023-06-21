using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRTutorial.Hubs;

namespace SignalRTutorial.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> _deathlyHub;

        public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> deathlyHub)
        {
            _logger = logger;
            _deathlyHub = deathlyHub;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (SD.DealthyHallowRace.ContainsKey(type))
                SD.DealthyHallowRace[type]++;

            await _deathlyHub.Clients.All.SendAsync("updateDeathlyHallowCount",
                                                    SD.DealthyHallowRace[SD.CLOAK],
                                                    SD.DealthyHallowRace[SD.STONE],
                                                    SD.DealthyHallowRace[SD.WAND]);

            return Accepted();
        }
    }
}