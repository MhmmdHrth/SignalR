using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRTutorial.Hubs;

namespace SignalRTutorial.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<VotingHub> _votingHub;

        public HomeController(ILogger<HomeController> logger, IHubContext<VotingHub> votingHub)
        {
            _logger = logger;
            _votingHub = votingHub;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public async Task<IActionResult> voting(string type)
        {
            if (SD.VotingCount.ContainsKey(type))
                SD.VotingCount[type]++;

            await _votingHub.Clients.All.SendAsync("updateVotingCount", SD.VotingCount);

            return Accepted();
        }
    }
}