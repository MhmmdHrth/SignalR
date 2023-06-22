using Microsoft.AspNetCore.SignalR;

namespace SubscriptionSample.Hubs
{
    public class HouseGroupHub : Hub
    {
        public static List<string> GroupsJoined { get; set; } = new();

        public async Task JoinGroup(string groupName)
        {
            var key = $"{Context.ConnectionId}:{groupName}";
            if (!GroupsJoined.Contains(key))
            {
                GroupsJoined.Add(key);
                await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            }
        }

        public async Task LeaveGroup(string groupName)
        {
            var key = $"{Context.ConnectionId}:{groupName}";
            if (GroupsJoined.Contains(key))
            {
                GroupsJoined.Remove(key);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            }
        }
    }
}
