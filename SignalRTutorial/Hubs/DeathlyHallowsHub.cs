using Microsoft.AspNetCore.SignalR;

namespace SignalRTutorial.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string, int> GetRaceStatus() => SD.DealthyHallowRace;
    }
}
