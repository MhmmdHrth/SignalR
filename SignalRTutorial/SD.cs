namespace SignalRTutorial
{
    public static class SD
    {
        static SD()
        {
            DealthyHallowRace = new();
            DealthyHallowRace.Add(WAND, 0);
            DealthyHallowRace.Add(STONE, 0);
            DealthyHallowRace.Add(CLOAK, 0);
        }

        public const string WAND = "wand";
        public const string STONE = "stone";
        public const string CLOAK = "cloak";

        public static Dictionary<string, int> DealthyHallowRace;
    }
}
