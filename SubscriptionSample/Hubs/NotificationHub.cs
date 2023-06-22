using Microsoft.AspNetCore.SignalR;

namespace SubscriptionSample.Hubs
{
    public class NotificationHub : Hub
    {
        public static int NotificationCounter { get; set; }
        public static List<string> Messages = new();

        public async Task SendMessage(string message)
        {
            if(!string.IsNullOrEmpty(message))
            {
                NotificationCounter++;
                Messages.Add(message);
                await LoadMessage();
            }
        }

        public async Task LoadMessage() =>
            await Clients.All.SendAsync("LoadNotification", Messages, NotificationCounter);

    }
}
