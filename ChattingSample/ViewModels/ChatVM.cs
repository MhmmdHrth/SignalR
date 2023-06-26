using ChattingSample.Models;

namespace ChattingSample.ViewModels
{
    public class ChatVM
    {
        public int MaxRoomAllowed { get; set; }
        public IList<ChatRoom> Rooms { get; set; }
        public string? UserId { get; set; }
        public bool AllowAddRom => Rooms == null || Rooms.Count < MaxRoomAllowed;
    }
}
