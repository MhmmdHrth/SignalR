using ChattingSample.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChattingSample.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _context;
        public ChatHub(ApplicationDbContext context) =>
            _context = context;

        public async Task SendMessageToAll(string user, string message) =>
            await Clients.All.SendAsync("MessageReceived", user, message);

        public async Task SendMessageToReceiver(string sender, string receiver, string message)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == receiver.ToLower());
            if (user != null)
                await Clients.User(user.Id).SendAsync("MessageReceived", sender, message);
        }
    }
}
