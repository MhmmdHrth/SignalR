using ChattingSample.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ChattingSample.Hubs
{
    public class AdvancedChatHub : Hub
    {
        private readonly ApplicationDbContext _context;
        public AdvancedChatHub(ApplicationDbContext context) =>
            _context = context;

        public async override Task OnConnectedAsync()
        {
            var UserId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!string.IsNullOrEmpty(UserId))
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
                await Clients.Users(HubConnections.OnlineUsers(UserId)).SendAsync("ReceiveUserConnection", user.UserName, HubConnections.HasUser(UserId), false);

                HubConnections.AddUserConnection(UserId);
            }

            await base.OnConnectedAsync();
        }

        public async override Task OnDisconnectedAsync(Exception exception)
        {
            var UserId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!string.IsNullOrEmpty(UserId))
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);

                HubConnections.RemoveUserConnection(UserId);
                await Clients.Users(HubConnections.OnlineUsers(UserId)).SendAsync("ReceiveUserConnection", user.UserName, true, true);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public static class HubConnections
        {
            //userId/isNotified
            public static List<string> Users = new();

            public static void AddUserConnection(string UserId)
            {
                if (!Users.Contains(UserId))
                    Users.Add(UserId);
            }

            public static void RemoveUserConnection(string UserId)
            {
                if (Users.Contains(UserId))
                    Users.Remove(UserId);
            }

            public static bool HasUser(string UserId) => Users.Contains(UserId);

            public static List<string> OnlineUsers(string userId) => Users.Where(x => x != userId).ToList();                                         
        }
    }
}
