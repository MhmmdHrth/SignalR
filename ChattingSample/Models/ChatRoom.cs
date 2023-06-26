using System.ComponentModel.DataAnnotations;

namespace ChattingSample.Models
{
    public class ChatRoom
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
