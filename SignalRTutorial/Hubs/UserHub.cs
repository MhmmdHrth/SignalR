using Microsoft.AspNetCore.SignalR;

namespace SignalRTutorial.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; }
        public static int TotalUsers { get; set; }

        public async Task<string> NewWindowLoaded()
        {
            TotalViews++;
            await Clients.All.SendAsync("updateTotalViews", TotalViews);

            return $"Total Views {TotalViews}";
        }

        public async override Task OnConnectedAsync()
        {
            TotalUsers++;
            await Clients.All.SendAsync("updateTotalUsers", TotalUsers);
            await base.OnConnectedAsync();
        }

        public async override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            await Clients.All.SendAsync("updateTotalUsers", TotalUsers);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
