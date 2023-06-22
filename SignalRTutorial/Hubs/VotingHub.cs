using Microsoft.AspNetCore.SignalR;

namespace SignalRTutorial.Hubs
{
    public class VotingHub : Hub
    {
        public Dictionary<string, int> GetVotingCount() => SD.VotingCount;
    }
}
