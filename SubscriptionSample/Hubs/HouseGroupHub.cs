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

                string grouplist = GetGroupByConnectionId();
                await Clients.Caller.SendAsync("subscriptionStatus", grouplist, groupName.ToLower(), true);
                await Clients.Others.SendAsync("sentNotification", groupName, true);

                await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            }
        }

        public async Task LeaveGroup(string groupName)
        {
            var key = $"{Context.ConnectionId}:{groupName}";
            if (GroupsJoined.Contains(key))
            {
                GroupsJoined.Remove(key);

                string grouplist = GetGroupByConnectionId();
                await Clients.Caller.SendAsync("subscriptionStatus", grouplist, groupName.ToLower(), false);
                await Clients.Others.SendAsync("sentNotification", groupName, false);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            }
        }

        public async Task TriggerGroupNotify(string groupName) =>
            await Clients.Group(groupName).SendAsync("triggerGroupNotification", groupName);

        public string GetGroupByConnectionId()
        {
            string grouplist = "";
            foreach (var group in GroupsJoined.Where(x => x.Split(":")[0] == Context.ConnectionId))
                grouplist += group.Split(":")[1] + " ";

            return grouplist;
        }
    }
}
